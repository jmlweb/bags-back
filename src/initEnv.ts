import dotenv from 'dotenv';

/**
 * Load into process.env my .env file
 */
function initEnv(): void {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
};

export default initEnv();
