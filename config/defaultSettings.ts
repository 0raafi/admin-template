import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#11F488',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'NameApps Admin',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {
    colorPrimary: '#11F488',
  },
  locale: 'en-US',
};

export default Settings;
