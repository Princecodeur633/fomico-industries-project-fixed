import { createRateLimitMiddleware } from '../../../utils/rate-limit';

// Max 10 quote requests per IP per hour.
export default () =>
  createRateLimitMiddleware({
    name: 'quote_request',
    maxRequests: 10,
    windowMs: 60 * 60 * 1000,
  });
