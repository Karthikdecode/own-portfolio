import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only: does a file exist under /public?
 *
 * Optional assets (the portrait, project covers) are resolved here rather than
 * with a client-side onError handler, because onError still requires the browser
 * to make — and fail — the request, which logs a 400/404 in the console. Checking
 * on the server means the <Image> is never mounted for a file that isn't there.
 *
 * Import only from server components. Evaluated at build time for static routes,
 * so adding an asset takes effect on the next build.
 */
export function publicAssetExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\//, "");
  return existsSync(join(process.cwd(), "public", relative));
}
