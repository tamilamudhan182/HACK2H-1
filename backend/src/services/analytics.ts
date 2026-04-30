export function trackEvent(name: string, metadata: any = {}) {
  return {
    name,
    metadata,
    trackedAt: new Date().toISOString()
  };
}
