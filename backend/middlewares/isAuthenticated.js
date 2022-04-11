const isAuthenticated = (req, res, next) => {
  if (req.session.username !== undefined) {
    next()
  } else {
    next(new Error('Not authenticated'))
  }
}

module.exports = isAuthenticated
