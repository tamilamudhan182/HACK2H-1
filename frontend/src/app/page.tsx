import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
      <HomeClient />
    </div>
  );
}
