const { response } = require("express");

const AdminRoles = (req, res = response, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "se quiere verificar el role sin valdiar token" });
  }
  const { role, nombre } = req.usuario;
  if (role != "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administradir - ho puede realizar esta acción`,
    });
  }
  next();
};

module.exports = {
  AdminRoles,
};
