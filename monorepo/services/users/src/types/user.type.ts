import { components } from './openapi.type';

export type User = {
  username: string;
  password?: string;
};

export type UserRequest = components['schemas']['UserRequest'];
export type ChangePasswordInput =
  components['schemas']['ChangePasswordRequest'];
