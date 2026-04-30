import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { ZodError } from "zod";
import xss from "xss";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import assistantRoutes from "./routes/assistant.js";
import googleRoutes from "./routes/google.js";
import stepsRoutes from "./routes/steps.js";
import userRoutes from "./routes/user.js";

function sanitizeValue(value: any): any {
  if (typeof value === "string") {
    return xss(value.trim());
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, sanitizeValue(entry)])
    );
  }

  return value;
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export function createApp() {
  const app = express();

  app.use(limiter);
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
          connectSrc: ["'self'", "https://*.googleapis.com", "https://*.vercel.app"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
    })
  );
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use((request: Request, _response: Response, next: NextFunction) => {
    if (request.body) {
      request.body = sanitizeValue(request.body);
    }
    next();
  });

  app.get("/health", (_request: Request, response: Response) => {
    response.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.use("/api", stepsRoutes);
  app.use("/api", userRoutes);
  app.use("/api", assistantRoutes);
  app.use("/api", googleRoutes);

  app.use((error: any, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      response.status(400).json({ message: "Invalid request", issues: error.issues });
      return;
    }

    response.status(500).json({ message: "Unexpected server error" });
  });

  return app;
}
