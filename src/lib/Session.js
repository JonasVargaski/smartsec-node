import Redis from 'ioredis';
import redisConfig from '../config/redis';

class SocketSession {
  constructor() {
    this.redis = new Redis({
      ...redisConfig,
      keyPrefix: 'session:',
    });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  getAll() {
    return this.redis.keys('session:*');
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`session:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('session:', ''));

    return this.redis.del(keysWithoutPrefix);
  }
}

export default new SocketSession();
