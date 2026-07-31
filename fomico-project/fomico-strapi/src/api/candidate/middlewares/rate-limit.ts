import { createRateLimitMiddleware } from '../../../utils/rate-limit';

// Max 5 job applications per IP per hour.
export default () =>
  createRateLimitMiddleware({
    name: 'candidate',
    maxRequests: 5,
    windowMs: 60 * 60 * 1000,
  });
