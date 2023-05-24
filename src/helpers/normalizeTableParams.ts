export default function normalizeTableParams(params: API.PageParams) {
  const { pageSize = 10, current = 1, ...restParams } = params || {};

  return {
    skip: pageSize * (current - 1),
    take: params.pageSize,
    ...restParams
  }
}
