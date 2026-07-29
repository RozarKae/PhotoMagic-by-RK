export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export function encodeCursor(id: string, timestamp: string): string {
  return Buffer.from(JSON.stringify({ id, timestamp })).toString('base64');
}

export function decodeCursor(cursor: string): { id: string; timestamp: string } | null {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function withTenantFilter<T extends { workspace_id: string }>(
  items: T[],
  workspaceId: string,
): T[] {
  return items.filter((item) => item.workspace_id === workspaceId);
}

export function withSoftDeleteFilter<T extends { deleted_at?: string | null }>(items: T[]): T[] {
  return items.filter((item) => !item.deleted_at);
}
