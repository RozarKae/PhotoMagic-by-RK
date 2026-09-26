import { createHash } from 'crypto';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class PromptCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxEntries: number;
  private defaultTtlMs: number;
  private hits = 0;
  private misses = 0;

  constructor(maxEntries = 500, defaultTtlSeconds = 3600) {
    this.maxEntries = maxEntries;
    this.defaultTtlMs = defaultTtlSeconds * 1000;
  }

  /**
   * Deterministically hash prompt + model + parameter payload to an SHA-256 key.
   */
  public hashKey(model: string, prompt: string, params: Record<string, any> = {}): string {
    const serializedParams = Object.keys(params)
      .sort()
      .reduce(
        (acc, k) => {
          acc[k] = params[k];
          return acc;
        },
        {} as Record<string, any>,
      );

    return createHash('sha256')
      .update(
        `${model.trim().toLowerCase()}::${prompt.trim()}::${JSON.stringify(serializedParams)}`,
      )
      .digest('hex');
  }

  /**
   * Retrieve cached inference result if present and unexpired.
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Refresh LRU order
    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits++;
    return entry.data as T;
  }

  /**
   * Store inference result with custom TTL.
   */
  public set<T>(key: string, data: T, ttlSeconds?: number): void {
    if (this.cache.size >= this.maxEntries) {
      // Evict oldest (least recently used)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    const ttlMs = ttlSeconds ? ttlSeconds * 1000 : this.defaultTtlMs;
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Get cache telemetry metrics.
   */
  public getStats(): { size: number; hits: number; misses: number; hitRate: string } {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? `${((this.hits / total) * 100).toFixed(1)}%` : '0.0%';
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate,
    };
  }

  public clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
}

// Global singleton instance for shared server-side prompt caching
export const globalPromptCache = new PromptCache(1000, 3600); // 1,000 items, 1 hour default TTL
