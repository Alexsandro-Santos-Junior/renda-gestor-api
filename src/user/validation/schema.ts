import { z } from 'zod';

export const createUser = z.object({
  name: z.string(),
  email: z.string().email(),
  picture: z.string().optional(),
});

export type CreateUser = z.infer<typeof createUser>;

// update User
export const updateUserRequest = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequest>;
