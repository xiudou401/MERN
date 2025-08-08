const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ error: 'authorization is required' });
  }
  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log(id);
    req.user = await User.findOne({ _id: id }).select('_id');
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ error: 'request is not authorized' });
  }
};

module.exports = requireAuth;
