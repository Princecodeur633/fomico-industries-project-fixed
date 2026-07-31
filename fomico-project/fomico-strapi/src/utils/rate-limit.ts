/**
 * Simple in-memory, per-IP rate limiter for public (unauthenticated) write
 * endpoints like the contact/quote/candidate forms.
 *
 * Not distributed (each server process has its own counters) — perfectly
 * fine for a single-instance deployment. For a multi-instance/production
 * setup behind a load balancer, swap this for a Redis-backed limiter.
 */

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

// Periodically forget old buckets so this Map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (now - bucket.windowStart > 60 * 60 * 1000) {
      buckets.delete(key);
    }
  }
}, 15 * 60 * 1000).unref();

export function createRateLimitMiddleware(options: {
  name: string;
  maxRequests: number;
  windowMs: number;
}) {
  const { name, maxRequests, windowMs } = options;

  return async (ctx: any, next: () => Promise<void>) => {
    const ip = ctx.request.ip || 'unknown';
    const key = `${name}_${ip}`;
    const now = Date.now();

    const bucket = buckets.get(key);

    if (!bucket || now - bucket.windowStart > windowMs) {
      buckets.set(key, { count: 1, windowStart: now });
    } else {
      bucket.count += 1;
      if (bucket.count > maxRequests) {
        ctx.throw(429, 'Trop de requêtes envoyées. Merci de réessayer plus tard.');
      }
    }

    await next();
  };
}
