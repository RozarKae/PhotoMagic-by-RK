export type UserRole =
  | 'super_admin'
  | 'studio_owner'
  | 'studio_manager'
  | 'photographer'
  | 'editor'
  | 'office_staff'
  | 'client'
  | 'guest';

export interface UserSession {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  workspaceId: string;
  branchId?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
}

export type PermissionAction =
  | 'workspace:manage'
  | 'staff:manage'
  | 'lead:view'
  | 'lead:create'
  | 'project:view'
  | 'project:edit'
  | 'gallery:view'
  | 'gallery:select'
  | 'gallery:upload'
  | 'album:proof'
  | 'album:approve'
  | 'financial:view'
  | 'financial:collect';
