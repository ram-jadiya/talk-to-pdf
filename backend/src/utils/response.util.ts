/**
 * @method responseHandler
 * @param {Object | String | Array} data
 * @param {Number} statusCode
 * @param {String} message
 * @param {Boolean} hasError
 * @returns {Object}
 * @description ensures same response pattern for all APIs
 */
export const responseHandler = (
  data?: object | string | object[] | null,
  statusCode?: number,
  message?: string,
  hasError?: boolean
): object => {
  return {
    statusCode: statusCode || 200,
    hasError: hasError || false,
    data: data ? data : null,
    message: message || 'success',
  };
};
