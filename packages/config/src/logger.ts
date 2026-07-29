type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  traceId?: string;
  workspaceId?: string;
}

class Logger {
  private format(level: LogLevel, payload: LogPayload) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message: payload.message,
      workspaceId: payload.workspaceId || 'global',
      traceId: payload.traceId || 'none',
      context: payload.context || {},
    });
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.format('debug', { message, context }));
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    console.info(this.format('info', { message, context }));
  }

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(this.format('warn', { message, context }));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    console.error(
      this.format('error', {
        message,
        context: {
          ...context,
          error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
        },
      }),
    );
  }
}

export const logger = new Logger();
