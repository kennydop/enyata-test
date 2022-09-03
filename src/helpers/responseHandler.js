module.exports = (res, data = { msg: "Success" }, status = 200) => {
  const dataType = typeof data;

  if (dataType === "string") {
    data = { msg: data };
  } else {
    data = { data: data };
  }
  res.status(status).json({ success: true, ...data });
};
