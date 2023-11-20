export enum HTTPStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

export type HTTPRequest = {
  body: {
    [key: string]: any;
  };
  query: {
    [key: string]: any;
  };
  params: {
    [key: string]: string;
  };
  method: string;
  path: string;
  headers: {
    [key: string]: any;
  };
};

export type HTTPResponse = {
  statusCode: HTTPStatus;
  body: {
    [key: string]: any;
  };
  headers: {
    [key: string]: any;
  };
};
