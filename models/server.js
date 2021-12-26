const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      propuestas: "/api/propuestas",
      usuarios: "/api/usuarios",
      auth: "/api/auth",
    };

    // conectar a mongoDB
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // Lectura y parseo de body
    this.app.use(express.json());

    // Directorio Publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.paths.propuestas, require("../routes/propuesta"));
    this.app.use(this.paths.usuarios, require("../routes/usuario"));
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
