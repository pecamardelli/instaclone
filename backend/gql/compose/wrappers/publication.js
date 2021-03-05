const publicationCreateOneWrapper = (next) => async (rp) => {
  const { record } = rp.args;
  const { context } = rp;
  console.dir(rp.args);
  return next(rp);
};

module.exports = {
  publicationCreateOneWrapper,
};
