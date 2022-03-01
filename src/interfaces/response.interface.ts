export interface Response<R = any> {
  errorCode: string;
  errorMessage?: string;
  msg: R;
}
