module.exports = (error, req, res, next) => {
  const { code, message, status, stack } = error;
  console.error(
    `An Error Occurred!!\nError Code: ${code}\nError Message: ${message}\n\nError Stack: ${stack}\n`
  );
  res.status(status ?? 500).end(message);
};
