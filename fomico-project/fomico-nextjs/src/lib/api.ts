const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseErrorMessage(res: Response): Promise<{ message: string; details?: unknown }> {
  try {
    const body = await res.json();
    // Strapi's error shape: { error: { message, details, ... } }
    if (body?.error?.message) {
      return { message: body.error.message, details: body.error.details };
    }
  } catch {
    // response wasn't JSON — fall through to the generic message below
  }
  return { message: `Erreur ${res.status}: ${res.statusText}` };
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const { message, details } = await parseErrorMessage(res);
    throw new ApiError(message, res.status, details);
  }

  return res.json();
}

/**
 * Submit a public form (contact/quote/candidate) using multipart/form-data so
 * an optional file field can be attached. Falls back to a plain JSON POST
 * when no file is provided (Strapi accepts both for these endpoints).
 */
async function submitPublicForm<T>(
  endpoint: string,
  data: Record<string, unknown>,
  file?: { field: string; value: File | null | undefined }
): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;

  if (file?.value) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append(`files.${file.field}`, file.value);

    const res = await fetch(url, { method: "POST", body: formData });
    if (!res.ok) {
      const { message, details } = await parseErrorMessage(res);
      throw new ApiError(message, res.status, details);
    }
    return res.json();
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const { message, details } = await parseErrorMessage(res);
    throw new ApiError(message, res.status, details);
  }
  return res.json();
}

// Products
export async function getProducts(locale: string = "fr") {
  return fetchAPI(`/products?locale=${locale}&populate=*`);
}

export async function getProductBySlug(slug: string, locale: string = "fr") {
  return fetchAPI(`/products?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`);
}

// Services
export async function getServices(locale: string = "fr") {
  return fetchAPI(`/services?locale=${locale}&populate=*`);
}

// Sectors
export async function getSectors(locale: string = "fr") {
  return fetchAPI(`/sectors?locale=${locale}&populate=*`);
}

// News
export async function getNews(locale: string = "fr", limit: number = 6) {
  return fetchAPI(`/news?locale=${locale}&populate=*&pagination[limit]=${limit}&sort[0]=publishedAt:desc`);
}

// Projects
export async function getProjects(locale: string = "fr") {
  return fetchAPI(`/projects?locale=${locale}&populate=*`);
}

// Testimonials
export async function getTestimonials(locale: string = "fr") {
  return fetchAPI(`/testimonials?locale=${locale}&populate=*`);
}

// Partners
export async function getPartners(locale: string = "fr") {
  return fetchAPI(`/partners?locale=${locale}&populate=*`);
}

// Jobs
export async function getJobs(locale: string = "fr") {
  return fetchAPI(`/jobs?locale=${locale}&populate=*`);
}

// Settings (singleType — Strapi returns 404 until an entry has been created
// in the admin, which is a normal state, not an error, so we return null).
export async function getSettings(locale: string = "fr") {
  try {
    return await fetchAPI(`/setting?locale=${locale}&populate=*`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

// Quote Requests (public, unauthenticated endpoint; supports an optional file)
export async function createQuoteRequest(
  data: Record<string, unknown>,
  file?: File | null
) {
  return submitPublicForm("/quote-requests/public", data, { field: "fichier", value: file });
}

// Contact Messages (public, unauthenticated endpoint)
export async function createContactMessage(data: Record<string, unknown>) {
  return submitPublicForm("/contact-messages/public", data);
}

// Candidates / job applications (public, unauthenticated endpoint; supports an optional CV file)
export async function createCandidate(data: Record<string, unknown>, cv?: File | null) {
  return submitPublicForm("/candidates/public", data, { field: "cv", value: cv });
}
