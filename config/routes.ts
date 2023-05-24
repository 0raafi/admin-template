/**
 * @name umi Routing configuration
 * @description Only support Path, Component, Routes, Redirect, Wrappers, name, icon configuration
 * @param path  PATH only supports the configuration of two types of placeholders. The first is the form of dynamic parameters: ID, and the second is the * -pass formula. The passage can only appear the last of the routing string.
 * @param component Configure the React component path for rendering after matching the Location and Path.It can be an absolute path or a relative path. If it is a relative path, it will start from SRC/PAGES.
 * @param routes Configuration child routing is usually used when the layout component is needed for multiple paths.
 * @param redirect Configuration route jump
 * @param wrappers The packaging component of the configuration routing component can be combined with more functions for the current routing component.For example, it can be used for the permissions of the routing level
 * @param name Configure the title of the routing, and read the value of Menu.xxxx in the internationalized file Menu.Ts default.
 * @param icon Configure the routing icon, please refer to https://ant.design/components/icon-cn. Pay attention to remove the style suffix and lowercase.If you want to configure the icon as <useroutlined />, the value should be used as user or user
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: 'category',
    icon: 'hddOutlined',
    path: '/category',
    component: './Category',
    access: 'canViewCategory'
  },
  {
    path: '/',
    redirect: '/category',
  },
  {
    path: '*',
    component: './404',
  },
];
