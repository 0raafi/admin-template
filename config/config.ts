import { join } from 'path';
import { defineConfig } from '@umijs/max';

import proxy from './proxy';
import routes from './routes';
import defaultSettings from './defaultSettings';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  define: {
    API_URL: 'http://localhost:3206',

  },
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'NameApps Admin',
  layout: {
    locale: {
      default: 'en-US',
    },
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: false,
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [
    { src: '/scripts/loading.js', async: true },
  ],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
