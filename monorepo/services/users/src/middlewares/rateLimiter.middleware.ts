import { redisClient } from '../../../../src/clients/redis.client';
import { Response } from '../../../../src/common/types.common';
import { generateResponse } from '../../../../src/common/response.common';

const MAX_REQUESTS_PER_MINUTE = 20;
const MAX_REQUESTS_PER_HOUR = 200;
const MAX_REQUESTS_PER_DAY = 400;
const DELAY_TIME = 24000;

function timeout() {
  return new Promise((resolve) => {
    setTimeout(resolve, DELAY_TIME);
  });
}

async function rateLimiter(ip: string): Promise<Response | void> {
  try {
    const currentTime = Date.now();

    const { minuteData, hourlyData, dayData } =
      await redisClient.getRateLimitData(ip);

    if (dayData && dayData.timestamp && dayData.count) {
      const dayTimestamp = parseInt(dayData.timestamp);
      const dayCount = parseInt(dayData.count);

      if (currentTime - dayTimestamp < 24 * 60 * 60 * 1000) {
        if (dayCount >= MAX_REQUESTS_PER_DAY) {
          await timeout();
          return {
            statusCode: 429,
            body: {
              message:
                'Rate limit exceeded (per day). Please try again tommorrow.',
            },
          };
        }
      }
      await redisClient.incrementRateLimitCount(ip, 'day', 'count');
    } else {
      await redisClient.setRateLimitData(ip, 'day', {
        count: 1,
        timestamp: currentTime.toString(),
      });
      await redisClient.setExpire(ip, 60 * 60 * 24, 'day');
    }

    if (hourlyData && hourlyData.timestamp && hourlyData.count) {
      const hourlyTimestamp = parseInt(hourlyData.timestamp);
      const hourlyCount = parseInt(hourlyData.count);

      if (currentTime - hourlyTimestamp < 3600000) {
        if (hourlyCount >= MAX_REQUESTS_PER_HOUR) {
          await timeout();
          return {
            statusCode: 429,
            body: {
              message:
                'Rate limit exceeded (per hour). Please try again after an hour.',
            },
          };
        }
      }
      await redisClient.incrementRateLimitCount(ip, 'hourly', 'count');
    } else {
      await redisClient.setRateLimitData(ip, 'hourly', {
        count: 1,
        timestamp: currentTime.toString(),
      });
      await redisClient.setExpire(ip, 60 * 60 * 2, 'hourly');
    }

    if (minuteData && minuteData.timestamp && minuteData.count) {
      const minuteTimestamp = parseInt(minuteData.timestamp);
      const minuteCount = parseInt(minuteData.count);

      if (currentTime - minuteTimestamp < 60000) {
        if (minuteCount >= MAX_REQUESTS_PER_MINUTE) {
          await timeout();
          return {
            statusCode: 429,
            body: {
              message:
                'Rate limit exceeded (per minute). Please try again later.',
            },
          };
        }
      }
      await redisClient.incrementRateLimitCount(ip, 'minute', 'count');
    } else {
      await redisClient.setRateLimitData(ip, 'minute', {
        count: 1,
        timestamp: currentTime.toString(),
      });
      await redisClient.setExpire(ip, 60 * 2, 'minute');
    }
  } catch (error: unknown) {
    console.error('rate limiter error', error);
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

const rateLimiterMiddleware = () => {
  const before = async (request: any) => {
    await redisClient.connect();
    const ipAddress = request.event.requestContext.http.sourceIp;
    const response: Response | void = await rateLimiter(ipAddress);

    if (response) {
      return generateResponse(response);
    }
  };

  const after = async () => {
    await redisClient.closeConnection();
  };

  return {
    before,
    after,
  };
};

export { rateLimiterMiddleware };
