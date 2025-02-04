export const isValidRequestOrigin = (req: Request): boolean => {
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const allowedOrigin = Deno.env.get("BASE_URL") || "";

  return !(!origin || !origin.startsWith(allowedOrigin));
};
