export interface APISuccessEnvelope<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  timestamp: string;
}

export interface APIErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
  timestamp: string;
}

export function createSuccessResponse<T>(
  data: T,
  meta?: Record<string, unknown>,
): APISuccessEnvelope<T> {
  return {
    success: true,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  details?: Array<{ field: string; message: string }>,
): APIErrorEnvelope {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

export async function tryAction<T>(
  action: () => Promise<T>,
): Promise<APISuccessEnvelope<T> | APIErrorEnvelope> {
  try {
    const result = await action();
    return createSuccessResponse(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    return createErrorResponse('INTERNAL_SERVER_ERROR', message);
  }
}
