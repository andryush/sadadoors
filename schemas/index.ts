import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: 'This field is required',
  })
  .email({ message: 'Not vaild email' });

export const passwordSchema = z
  .string({ required_error: 'This field is required' })
  .min(8, { message: 'Password must be at least 8 characters' });
