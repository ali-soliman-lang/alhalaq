export default (fn: any) => (req: any, res: any, next: any) => {
  return fn(req, res, next).catch(next);
};
