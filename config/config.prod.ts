// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

import config from './config';

export default defineConfig({
  ...config,
  define: {
    API_URL: 'https://a07c-114-124-213-79.ngrok-free.app',
  },
});
