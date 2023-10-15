// inside of user.routes.js
const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);
  app.post("/api/logout", UserController.logoutUser);
  // this route now has to be authenticated
  app.get("/api/loginState", authenticate, UserController.loginState);
  app.get("/api/users", authenticate, UserController.getAllUsers);
  app.get("/api/user", authenticate, UserController.getUser);
  app.patch("/api/user/addCoach", authenticate, UserController.addCoach);
  app.get("/api/user/numberOfCoaches", authenticate, UserController.getNumberOfCoaches);
  app.patch("/api/user/:id", authenticate, UserController.updateUser);
};
