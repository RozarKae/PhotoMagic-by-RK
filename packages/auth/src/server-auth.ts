import { UserSession, PermissionAction } from './types';
import { hasPermission } from './rbac';

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = 'UNAUTHORIZED',
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function requireAuth(session: UserSession | null): UserSession {
  if (!session) {
    throw new AuthError('Authentication required to access this resource', 'UNAUTHORIZED');
  }
  return session;
}

export function requireWorkspace(
  session: UserSession | null,
  targetWorkspaceId?: string,
): UserSession {
  const validSession = requireAuth(session);
  if (targetWorkspaceId && validSession.workspaceId !== targetWorkspaceId) {
    throw new AuthError('Access denied for this studio workspace', 'FORBIDDEN');
  }
  return validSession;
}

export function requirePermission(
  session: UserSession | null,
  action: PermissionAction,
): UserSession {
  const validSession = requireAuth(session);
  if (!hasPermission(validSession.role, action)) {
    throw new AuthError(
      `User role '${validSession.role}' lacks permission '${action}'`,
      'FORBIDDEN',
    );
  }
  return validSession;
}
