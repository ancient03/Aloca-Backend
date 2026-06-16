const profile = async (req, res) => {
  res.json({
    status: "success",
    user: req.user,
  });
};

module.exports = {
  profile,
};