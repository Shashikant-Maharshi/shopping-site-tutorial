export type QueryParams = Array<[string, any]>

export const formatQueryParams = (params: QueryParams) => (
  params.map((param) => param.join("=")).join('&')
);