import Ajv, { ValidateFunction } from 'ajv';
import { generateResponse } from '../common/response.common';

const ajv = new Ajv({
  $data: true,
  strict: true,
  allErrors: true,
  passContext: true,
});

let validateFunction: ValidateFunction | null;

const ajvMiddleware = (schema: any) => {
  const before = (request: any) => {
    if (!validateFunction) {
      validateFunction = ajv.compile(schema);
    }
    try {
      const payload: any = request.event?.body?.trim()
        ? JSON.parse(request.event?.body?.trim())
        : {};
      const isValid = validateFunction(payload);

      if (!isValid) {
        return generateResponse({
          statusCode: 400,
          body: {
            message: validateFunction.errors,
          },
        });
      }
    } catch (err) {
      return generateResponse({
        statusCode: 500,
        body: {
          message: 'internal server error',
        },
      });
    }
  };

  const after = () => {};

  return {
    before,
    after,
  };
};

export { ajvMiddleware };
