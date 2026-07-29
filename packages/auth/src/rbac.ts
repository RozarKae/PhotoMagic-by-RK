import { UserRole, PermissionAction } from './types';

const ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  super_admin: [
    'workspace:manage',
    'staff:manage',
    'lead:view',
    'lead:create',
    'project:view',
    'project:edit',
    'gallery:view',
    'gallery:select',
    'gallery:upload',
    'album:proof',
    'album:approve',
    'financial:view',
    'financial:collect',
  ],
  studio_owner: [
    'workspace:manage',
    'staff:manage',
    'lead:view',
    'lead:create',
    'project:view',
    'project:edit',
    'gallery:view',
    'gallery:select',
    'gallery:upload',
    'album:proof',
    'album:approve',
    'financial:view',
    'financial:collect',
  ],
  studio_manager: [
    'staff:manage',
    'lead:view',
    'lead:create',
    'project:view',
    'project:edit',
    'gallery:view',
    'gallery:select',
    'gallery:upload',
    'album:proof',
    'financial:view',
  ],
  office_staff: [
    'lead:view',
    'lead:create',
    'project:view',
    'project:edit',
    'financial:view',
    'financial:collect',
  ],
  photographer: ['project:view', 'gallery:view', 'gallery:upload'],
  editor: ['project:view', 'gallery:view', 'gallery:upload', 'album:proof'],
  client: ['project:view', 'gallery:view', 'gallery:select', 'album:proof', 'album:approve'],
  guest: ['gallery:view'],
};

export function hasPermission(role: UserRole, action: PermissionAction): boolean {
  return ROLE_PERMISSIONS[role]?.includes(action) ?? false;
}
