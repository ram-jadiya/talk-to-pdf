export const statusCode = {
  CONTINUE: 100, // Initial response indicating that the client should continue
  SWITCHING_PROTOCOLS: 101, // Indicating that the server is switching protocols
  PROCESSING: 102, // WebDAV: server has received and is processing the request
  EARLYHINTS: 103, // Providing hints before the final response
  OK: 200, // Request succeeded
  CREATED: 201, // Resource has been created successfully
  ACCEPTED: 202, // Request has been accepted for processing, but not completed
  NON_AUTHORITATIVE_INFORMATION: 203, // Returned meta-information is not from the origin server
  NO_CONTENT: 204, // Request succeeded, but there's no content to return
  RESET_CONTENT: 205, // Request succeeded, and the user agent should reset the document view
  PARTIAL_CONTENT: 206, // Partial response for a range request
  AMBIGUOUS: 300, // Request has more than one possible response
  MOVED_PERMANENTLY: 301, // Resource has been permanently moved to a new URL
  FOUND: 302, // Resource temporarily resides at a different URI
  SEE_OTHER: 303, // Response can be found under another URI
  NOT_MODIFIED: 304, // Resource has not been modified since the last request
  TEMPORARY_REDIRECT: 307, // Request should be repeated at another URI, but future requests should use the original URI
  PERMANENT_REDIRECT: 308, // The request and all future requests should be repeated using another URI
  BAD_REQUEST: 400, // Client sent a request that is malformed or invalid
  UNAUTHORIZED: 401, // Authentication is required and has failed or has not been provided
  PAYMENT_REQUIRED: 402, // Reserved for future use (payment required)
  FORBIDDEN: 403, // Server understands the request but refuses to authorize it
  NOT_FOUND: 404, // Requested resource could not be found
  METHOD_NOT_ALLOWED: 405, // Request method is not allowed for the specified resource
  NOT_ACCEPTABLE: 406, // Resource is not available in a format acceptable to the client
  PROXY_AUTHENTICATION_REQUIRED: 407, // Proxy authentication is required
  REQUEST_TIMEOUT: 408, // Server timed out waiting for the request
  CONFLICT: 409, // Request could not be processed due to conflict in request
  GONE: 410, // Requested resource is no longer available
  LENGTH_REQUIRED: 411, // Content-Length header required
  PRECONDITION_FAILED: 412, // Precondition given in the request was false
  PAYLOAD_TOO_LARGE: 413, // Request entity is larger than limits defined by server
  URI_TOO_LONG: 414, // Request-URI is too long
  UNSUPPORTED_MEDIA_TYPE: 415, // Media format of the requested data is not supported
  REQUESTED_RANGE_NOT_SATISFIABLE: 416, // Requested range cannot be satisfied
  EXPECTATION_FAILED: 417, // Server cannot meet the requirements of the Expect request-header field
  I_AM_A_TEAPOT: 418, // April Fools' joke; server refuses to brew coffee
  MISDIRECTED: 421, // Request was directed at a server that is not able to produce a response
  UNPROCESSABLE_ENTITY: 422, // Request was well-formed but was unable to be followed due to semantic errors
  FAILED_DEPENDENCY: 424, // Request failed due to failure of a previous request
  PRECONDITION_REQUIRED: 428, // Origin server requires the request to be conditional
  TOO_MANY_REQUESTS: 429, // User has sent too many requests in a given amount of time
  INTERNAL_SERVER_ERROR: 500, // Generic error message for server-side issues
  NOT_IMPLEMENTED: 501, // Server does not support the functionality required to fulfill the request
  BAD_GATEWAY: 502, // Server received an invalid response from an upstream server
  SERVICE_UNAVAILABLE: 503, // Server is currently unable to handle the request due to temporary overload
  GATEWAY_TIMEOUT: 504, // Server did not receive a timely response from an upstream server
  HTTP_VERSION_NOT_SUPPORTED: 505, // Server does not support the HTTP protocol version used in the request
};
