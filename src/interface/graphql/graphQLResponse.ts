 export type CustomResponse<T> = {
  errors: {
    message: string;
    extensions: {
      code: string;
    };
  }[];
  data: T;
};
