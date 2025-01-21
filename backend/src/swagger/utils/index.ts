export const errorResponseObject = (code: number, msg: string) => {
  return {
    statusCode: code,
    message: msg,
  };
};

export const errosArrayObject = (errorArr: Array<{ code: number; msg: string }>) => {
  return {
    ErrorsArrayExample: {
      summary: 'Array of error messages',
      value: errorArr.map((it) => errorResponseObject(it.code, it.msg)),
    },
  };
};
