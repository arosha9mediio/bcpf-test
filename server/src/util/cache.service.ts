import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, Milliseconds } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * generates a key using provided data
   * @param methodName
   * @param id
   * @param queryLevel
   * @returns
   * @example
   * const key = this.cacheService.createKey('findPage', id, queryLevel);
   */
  createKey(methodName: string, id: string, queryLevel: number) {
    return `${methodName}-${id}-${queryLevel}`;
  }

  /**
   * get cache matches the provided key
   * @param key
   * @returns
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      return <T>await this.cacheManager.get(key);
    } catch (error) {
      console.error(`Failed to get cache for key ${key}:`, error);
      return null;
    }
  }

  /**
   * cache the key value pair provided
   * @param key
   * @param value the data should be cached
   * @param ttl life time of the cache in ms
   * @returns
   */
  async set<T>(key: string, value: T, ttl: Milliseconds) {
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      console.error(`Failed to set cache for key ${key}:`, error);
    }
  }

  /**
   * deletes cache assigned for the provided key
   * @param key
   * @returns
   */
  async removeKey(key: string) {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      console.error(`Failed to delete cache for key ${key}:`, error);
    }
  }

  /**
   * deletes cache for multiple keys
   * @param keys array of keys
   */
  async removeKeys(keys: string[]): Promise<void> {
    try {
      await Promise.all(keys.map((key) => this.removeKey(key)));
    } catch (error) {
      console.error('Failed to delete keys:', error);
    }
  }

  // private categoryCache: { [title: string]: string } = {};

  // getCategories(): { [title: string]: string } {
  //   return this.categoryCache;
  // }

  // setCategories(categories: { [title: string]: string }): void {
  //   this.categoryCache = categories;
  // }
}
