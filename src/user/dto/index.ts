export type CreateUserDTO = {
  name: string;
  email: string;
  picture?: string;
  authProviderId: string;
};

export type UpdateUserDTO = {
  name?: string;
  email?: string;
  authProviderId?: string;
};
