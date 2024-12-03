//TODO: lets skip ajv for now, then we try to deploy this eh?
const ajvMiddleware = () => {
  const before = (request:any) => {};

  const after = () => {};

  return {
    before,
    after,
  };
};

export { ajvMiddleware };
