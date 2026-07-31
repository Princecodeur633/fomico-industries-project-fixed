import { createRateLimitMiddleware } from '../../../utils/rate-limit';

// Max 10 contact messages per IP per hour.
export default () =>
  createRateLimitMiddleware({
    name: 'contact_message',
    maxRequests: 10,
    windowMs: 60 * 60 * 1000,
  });
