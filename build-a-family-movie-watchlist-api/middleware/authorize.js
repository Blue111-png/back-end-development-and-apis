export function authorizeModification(req, res, next) {
  const userRole = req.user.role
  const id = req.params.userId

  if (userRole === "parent") {
    return next()
  }

  if (userRole === "child" && String(id) === String(req.user.id)) {
    return next()
  }

  return res.status(403).json({ error: "Access denied" })
}