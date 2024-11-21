import { User } from '../types/user.type';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Response } from '../../../../src/common/types.common';
import { generateResponse } from '../../../../src/common/response.common';

const JWT_SECRET = 'my-secret';

//TODO: needs a get and setter, store it somewhere, not in the middleware
let token: string | undefined;
let user: User | undefined;

interface TokenValidationResult {
  valid: boolean;
  decoded?: User;
  error?: string;
}

function validateToken(request: any): Response | void {
  try {
    token = request.event.headers.token;

    if (!token) {
      return {
        statusCode: 400,
        body: {
          message: 'Token missing in headers',
        },
      };
    }

    const result: TokenValidationResult = validateAndDecodeUserToken(token);

    if (!result.valid) {
      return {
        statusCode: 400,
        body: {
          message: 'invalid token',
        },
      };
    }

    user = result.decoded;
  } catch (err) {
    console.error('verify token error', err);
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

function validateAndDecodeUserToken(token: string): TokenValidationResult {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as User;
    return {
      valid: true,
      decoded,
    };
  } catch (error) {
    const jwtError = error as VerifyErrors;
    if (jwtError.name === 'TokenExpiredError') {
      return {
        valid: false,
        error: 'Token has expired',
      };
    } else if (jwtError.name === 'JsonWebTokenError') {
      return {
        valid: false,
        error: 'Invalid token',
      };
    }
    return {
      valid: false,
      error: 'Token validation failed',
    };
  }
}

const verifyTokenMiddleware = () => {
  const before = (request: any) => {
    const response: Response | void = validateToken(request);

    if (response) {
      return generateResponse(response);
    }
  };

  const after = () => {
    token = undefined;
    user = undefined;
  };

  return {
    before,
    after,
  };
};

export { verifyTokenMiddleware, token, user };
