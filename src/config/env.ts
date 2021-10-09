import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  PASSWORD_SALT: process.env.PASSWORD_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
};
