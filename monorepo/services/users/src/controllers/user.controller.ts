import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userService from '../electrodb/user.service';
import { Response } from '../../../../src/common/types.common';
import { User, UserRequest, ChangePasswordInput } from '../types/user.type';

const JWT_SECRET = 'my-secret';

export async function login(userInput: UserRequest): Promise<Response> {
  try {
    const { username, password } = userInput;

    const result = await userService.entities.user
      .get({
        username,
        type: 'credentials',
      })
      .go();

    if (result.data === null) {
      return {
        statusCode: 400,
        body: {
          message: 'username does not exists',
        },
      };
    }

    const user = result.data;

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return {
        statusCode: 403,
        body: {
          message: 'unauthorized',
        },
      };
    }

    const token = generateToken({ username });

    return {
      statusCode: 200,
      body: {
        token,
        user: {
          username,
        },
        message: 'success',
      },
    };
  } catch (err) {
    console.error('login error', { err });
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

export async function register(userInput: UserRequest): Promise<Response> {
  try {
    const { username, password } = userInput;

    let result = await userService.entities.user
      .get({
        username,
        type: 'credentials',
      })
      .go();

    console.log('dynamodb', result);

    if (result.data !== null) {
      return {
        statusCode: 400,
        body: { message: 'username already exists' },
      };
    }
    console.log('salt and hash');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    console.log('salt and hash done, trying to save,,,');

    result = await userService.entities.user
      .create({ username, password: hashPassword, type: 'credentials' })
      .go();

    console.log('saved!', result);

    const token = generateToken({ username });

    console.log('token!', token);

    return {
      statusCode: 201,
      body: {
        token,
        user: {
          username,
        },
        message: 'success',
      },
    };
  } catch (err) {
    console.error('register error', { err });
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

export async function changePassword(
  userInput: ChangePasswordInput,
): Promise<Response> {
  try {
    const { username, oldPassword, newPassword } = userInput;

    const result = await userService.entities.user
      .get({
        username,
        type: 'credentials',
      })
      .go();

    if (result.data === null) {
      return {
        statusCode: 404,
        body: { message: 'user not found' },
      };
    }

    const user = result.data;

    const isMatch = await bcrypt.compare(oldPassword, user?.password ?? '');

    if (!isMatch) {
      return {
        statusCode: 403,
        body: { message: 'unauthorized' },
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await userService.entities.user
      .patch({
        username,
        type: 'credentials',
      })
      .set({
        password: hashPassword,
      })
      .go();

    const token = generateToken({
      username,
    });

    return {
      statusCode: 200,
      body: {
        token,
        user: {
          username,
        },
        message: 'success',
      },
    };
  } catch (err) {
    console.error('change password error', { err });
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

export function verified(user: User): Response {
  return {
    statusCode: 200,
    body: { message: 'verified', user: user },
  };
}

export function allowed(): Response {
  return {
    statusCode: 200,
    body: { message: 'allowed' },
  };
}

function generateToken(user: User): string {
  return jwt.sign(
    {
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );
}
