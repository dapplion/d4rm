const wrapErrors = fn => (req, res, next) => {
  fn(req, res).catch(error => next(error));
};

module.exports = wrapErrors;
