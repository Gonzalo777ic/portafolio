export const LOGIN_PATH = "/login";
export const ADMIN_PATH = "/admin";

export function isChromeHidden(pathname: string) {
  return pathname === LOGIN_PATH || pathname.startsWith(ADMIN_PATH);
}
