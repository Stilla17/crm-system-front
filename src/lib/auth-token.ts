export type AuthTokenPayload = {
  accountType?: string;
  companyId?: string | null;
  company_id?: string | null;
  isSystem?: boolean;
  isSuperAdmin?: boolean;
  isSystemUser?: boolean;
  is_super_admin?: boolean;
  is_system_user?: boolean;
  kind?: string;
  permissions?: string[];
  role?: string | { name?: string; roleName?: string; slug?: string };
  roleName?: string;
  role_name?: string;
  role_slug?: string;
  scope?: string | string[];
  systemRole?: string;
  type?: string;
  user?: AuthTokenPayload;
  userType?: string;
};

export const decodeAuthToken = (token: string): AuthTokenPayload | null => {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      Math.ceil(normalizedPayload.length / 4) * 4,
      "=",
    );

    return JSON.parse(atob(paddedPayload)) as AuthTokenPayload;
  } catch {
    return null;
  }
};

const normalizeClaim = (value: string) =>
  value.toLowerCase().replace(/[.\-:/\s]+/g, "_");

export const isSuperAdminToken = (token?: string | null) => {
  if (!token) return false;

  const payload = decodeAuthToken(token);

  if (!payload) return false;

  const user = payload.user ?? payload;
  const role = user.role;
  const roleValues = [
    user.roleName,
    user.role_name,
    user.role_slug,
    user.systemRole,
    user.accountType,
    user.kind,
    user.type,
    user.userType,
    typeof role === "string" ? role : role?.name,
    typeof role === "object" ? role?.roleName : undefined,
    typeof role === "object" ? role?.slug : undefined,
  ];

  const systemRoles = new Set([
    "super_admin",
    "system",
    "system_admin",
    "system_user",
  ]);
  const permissions = [
    ...(payload.permissions ?? []),
    ...(user.permissions ?? []),
    ...(Array.isArray(payload.scope)
      ? payload.scope
      : typeof payload.scope === "string"
        ? payload.scope.split(" ")
        : []),
  ].map(normalizeClaim);
  const hasSystemPermission = permissions.some(
    (permission) =>
      permission === "*" ||
      permission === "all" ||
      permission.startsWith("system_") ||
      permission.startsWith("super_admin_"),
  );

  return (
    user.isSuperAdmin === true ||
    user.is_super_admin === true ||
    user.isSystemUser === true ||
    user.is_system_user === true ||
    user.isSystem === true ||
    user.companyId === null ||
    user.company_id === null ||
    hasSystemPermission ||
    roleValues.some(
      (value) =>
        typeof value === "string" && systemRoles.has(normalizeClaim(value)),
    )
  );
};
