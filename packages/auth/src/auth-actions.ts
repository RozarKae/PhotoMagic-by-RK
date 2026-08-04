import { createSuccessResponse, createErrorResponse } from '@photomagic/config';
import { supabaseClient } from './supabase-client';
import { UserRole } from './types';

export interface LoginPayload {
  email: string;
  password?: string;
  useMagicLink?: boolean;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  fullName: string;
  role?: UserRole;
  workspaceId?: string;
}

export async function loginAction(payload: LoginPayload) {
  if (!payload.email) {
    return createErrorResponse('INVALID_INPUT', 'Email address is required.');
  }

  if (payload.useMagicLink) {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: payload.email,
    });
    if (error) {
      return createErrorResponse('UNAUTHORIZED', error.message);
    }
    return createSuccessResponse({
      message: 'Magic login link dispatched to email.',
      emailSent: true,
    });
  }

  if (!payload.password) {
    return createErrorResponse('INVALID_INPUT', 'Password is required.');
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error || !data.session || !data.user) {
    return createErrorResponse('UNAUTHORIZED', error?.message || 'Invalid login credentials.');
  }

  const role = (data.user.user_metadata?.role as UserRole) || 'client';

  return createSuccessResponse({
    sessionToken: data.session.access_token,
    user: {
      userId: data.user.id,
      email: data.user.email || payload.email,
      fullName: data.user.user_metadata?.full_name || payload.email.split('@')[0],
      role,
      workspaceId: data.user.user_metadata?.workspace_id || 'ws_default',
      emailVerified: !!data.user.email_confirmed_at,
      createdAt: data.user.created_at,
    },
  });
}

export async function registerAction(payload: RegisterPayload) {
  if (!payload.email || !payload.fullName || !payload.password) {
    return createErrorResponse('INVALID_INPUT', 'Email, Full Name, and Password are required.');
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
        role: payload.role || 'client',
        workspace_id: payload.workspaceId || 'ws_default',
      },
    },
  });

  if (error) {
    return createErrorResponse('UNAUTHORIZED', error.message);
  }

  return createSuccessResponse({
    message: 'Account successfully registered.',
    userId: data.user?.id || 'usr_' + Date.now(),
  });
}

export async function forgotPasswordAction(email: string) {
  if (!email) {
    return createErrorResponse('INVALID_INPUT', 'Email address is required.');
  }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
  if (error) {
    return createErrorResponse('UNAUTHORIZED', error.message);
  }

  return createSuccessResponse({
    message: 'Password reset instructions sent to your email.',
    emailSent: true,
  });
}

export async function logoutAction() {
  await supabaseClient.auth.signOut();
  return createSuccessResponse({
    message: 'Session successfully invalidated.',
    loggedOut: true,
  });
}
