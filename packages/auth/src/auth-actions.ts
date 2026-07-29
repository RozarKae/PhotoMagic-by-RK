import { createSuccessResponse, createErrorResponse } from '@photomagic/config';

export interface LoginPayload {
  email: string;
  password?: string;
  useMagicLink?: boolean;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  fullName: string;
  inviteToken?: string;
}

export async function loginAction(payload: LoginPayload) {
  if (!payload.email) {
    return createErrorResponse('INVALID_INPUT', 'Email address is required.');
  }

  if (payload.useMagicLink) {
    // Magic Link Trigger Placeholder
    return createSuccessResponse({
      message: 'Magic login link dispatched to email.',
      emailSent: true,
    });
  }

  if (!payload.password) {
    return createErrorResponse('INVALID_INPUT', 'Password is required.');
  }

  // Session Token Issue Placeholder
  return createSuccessResponse({
    sessionToken: 'sess_mock_jwt_token',
    user: {
      userId: 'usr_client_99',
      email: payload.email,
      fullName: 'Eleanor Vance',
      role: 'client',
      workspaceId: 'ws_photomagic_demo',
      emailVerified: true,
      createdAt: new Date().toISOString(),
    },
  });
}

export async function registerAction(payload: RegisterPayload) {
  if (!payload.email || !payload.fullName) {
    return createErrorResponse('INVALID_INPUT', 'Email and Full Name are required.');
  }

  return createSuccessResponse({
    message: 'Account successfully registered.',
    userId: 'usr_new_' + Date.now(),
  });
}

export async function forgotPasswordAction(email: string) {
  if (!email) {
    return createErrorResponse('INVALID_INPUT', 'Email address is required.');
  }

  return createSuccessResponse({
    message: 'Password reset instructions sent to your email.',
    emailSent: true,
  });
}

export async function logoutAction() {
  return createSuccessResponse({
    message: 'Session successfully invalidated.',
    loggedOut: true,
  });
}
