/**
 * @see https://umijs.org/en-US/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.TokenResult } | undefined) {
  const { currentUser } = initialState ?? {};

  return {
    canViewCategory: currentUser && currentUser.access_permissions?.includes('category.view') as boolean,
    canCreateCategory: currentUser && currentUser.access_permissions?.includes('category.create') as boolean,
    canUpdateCategory: currentUser && currentUser.access_permissions?.includes('category.update') as boolean,
    canDeleteCategory: currentUser && currentUser.access_permissions?.includes('category.delete') as boolean,
  };
}
