const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(3, "name musst be at least 3 characters"),
  username: z.string().min(6, "username musst be at least 3 characters"),
  email: z.string().email("invalid email address"),
  role: z.string().min(4, "role musst be at least 4 characters"),
  password: z.string().min(8, "password musst be at least 8 characters"),
});
const updateUserSchema = z.object({
  name: z.string().min(3, "name musst be at least 3 characters"),
  username: z.string().min(6, "username musst be at least 3 characters"),
  email: z.string().email("invalid email address"),
  role: z.string().min(4, "role musst be at least 4 characters"),
  password: z.string().min(8, "password musst be at least 8 characters"),
});

module.exports = { createUserSchema, updateUserSchema };
