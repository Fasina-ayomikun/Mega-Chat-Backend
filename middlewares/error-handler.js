const checkError = (res, err) => {
  console.log(err.name);
  res.status(err.status || 500).json({ msg: err.message });
};
module.exports = checkError;
