export function isAdminRequest(request: Request): boolean {
 const password = process.env.ADMIN_PASSWORD;
 const username = process.env.ADMIN_USERNAME || "admin";
 return Boolean(password) && request.headers.get("x-admin-username") === username && request.headers.get("x-admin-password") === password;
}
