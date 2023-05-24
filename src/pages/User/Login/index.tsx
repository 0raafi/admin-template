import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { ConfigProvider, message } from 'antd';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, history, useIntl, useModel, Helmet } from '@umijs/max';

import cookie from '@/helpers/cookie';
import getToken from '@/services/serviceName/token';

import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.TokenResult>({});
  const { setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = (userInfo: API.TokenResult) => {
    cookie.set('access_token', userInfo.access_token);
    cookie.set('currentUser', JSON.stringify(userInfo));

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.TokenParams) => {

    try {
      const res = await getToken({ ...values, grant_type: 'password' });

      if (res.access_token) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'login successful!',
        });
        message.success(defaultLoginSuccessMessage);
        fetchUserInfo(res);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }

      setUserLoginState(res);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });

      message.error(defaultLoginFailureMessage);
    }
  };
  const { } = userLoginState;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#11F488'
        }
      }}
    >
      <div className={containerClassName}>
        <Helmet>
          <title>
            Login - {Settings.title}
          </title>
        </Helmet>
        <div
          style={{
            flex: '1',
            padding: '32px 0',
          }}
        >
          <LoginForm
            subTitle={false}
            title="NameApps Admin"
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            submitter={{
              searchConfig: {
                submitText: 'Login'
              }
            }}
            logo={<img alt="logo" src="/logo.svg" />}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.TokenParams);
            }}
          >

            <div style={{ marginTop: 24 }}>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="please enter user name!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="Please enter the password!"
                      />
                    ),
                  },
                ]}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="auto login" />
              </ProFormCheckbox>
            </div>
          </LoginForm>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
