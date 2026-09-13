/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site becomes plain HTML in ./out, hostable free
  // on Cloudflare Pages, Netlify or GitHub Pages. No server, nothing to break.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
