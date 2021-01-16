module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.isAdmin === true) {
      next()
    } else {
      res.status(403).send('Admin Only')
    }
  }
}
