const {
  saveRoute,
  deleteRoute,
  getRoutes,
  getSafeRoutes,
} = require("../controllers/route.controller");
const { addRoute } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const routesRouter = require("express").Router();

routesRouter.post("/route/save", authMiddleware, saveRoute);
routesRouter.delete("/route/delete/:routeId", authMiddleware, deleteRoute);
routesRouter.get("/route/all", authMiddleware, getRoutes);
routesRouter.post("/route/find", getSafeRoutes);
routesRouter.post("/route/add", addRoute)

module.exports = routesRouter;
