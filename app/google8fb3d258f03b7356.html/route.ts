export function GET() {
  return new Response("google-site-verification: google8fb3d258f03b7356.html", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
