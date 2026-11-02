export type Role = {
  id: string;
  roleName: string;
  slug?: string;
  permissions: string[];
  isCompanyAdmin?: boolean;
  isActive?: boolean;
};

export type CreateRoleType = {
  roleName: string;
  slug: string;
  permissions?: string[];
  isCompanyAdmin?: boolean;
  isActive?: boolean;
};
