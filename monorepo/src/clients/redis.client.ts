// redisClient.ts
import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private static instance: RedisClient;
  private redisClient: RedisClientType;

  private constructor() {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis error:', err);
      throw err;
    });
  }

  public async connect() {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect();
    }
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  private getMinuteKey(ip: string): string {
    return `rate_limit:${ip}:minute`;
  }

  private getHourlyKey(ip: string): string {
    return `rate_limit:${ip}:hourly`;
  }

  private getDayKey(ip: string): string {
    return `rate_limit:${ip}:day`;
  }

  async getRateLimitData(ip: string) {
    const minuteKey = this.getMinuteKey(ip);
    const hourlyKey = this.getHourlyKey(ip);
    const dayKey = this.getDayKey(ip);

    const minuteData = await this.redisClient.hGetAll(minuteKey);
    const hourlyData = await this.redisClient.hGetAll(hourlyKey);
    const dayData = await this.redisClient.hGetAll(dayKey);

    return { minuteData, hourlyData, dayData };
  }

  async setRateLimitData(
    ip: string,
    type: 'minute' | 'hourly' | 'day',
    data: { count: number; timestamp: string },
  ) {
    const key =
      type === 'minute'
        ? this.getMinuteKey(ip)
        : type === 'hourly'
          ? this.getHourlyKey(ip)
          : this.getDayKey(ip);
    await this.redisClient.hSet(key, data);
  }

  async incrementRateLimitCount(
    ip: string,
    type: 'minute' | 'hourly' | 'day',
    field: string,
  ) {
    const key =
      type === 'minute'
        ? this.getMinuteKey(ip)
        : type === 'hourly'
          ? this.getHourlyKey(ip)
          : this.getDayKey(ip);
    await this.redisClient.hIncrBy(key, field, 1);
  }

  async setExpire(ip: string, ttl: number, type: 'minute' | 'hourly' | 'day') {
    const key =
      type === 'minute'
        ? this.getMinuteKey(ip)
        : type === 'hourly'
          ? this.getHourlyKey(ip)
          : this.getDayKey(ip);
    await this.redisClient.expire(key, ttl);
  }

  public async closeConnection() {
    await this.redisClient.quit();
  }
}

export const redisClient = RedisClient.getInstance();
