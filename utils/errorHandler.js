module.exports = function(err, res) {
  console.error(err.message);
  res.status(500).send('Server Error');
};
