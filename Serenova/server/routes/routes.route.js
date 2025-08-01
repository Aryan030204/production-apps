const {
  saveRoute,
  deleteRoute,
  getRoutes,
  getSafeRoutes,
} = require("../controllers/route.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const routesRouter = require("express").Router();

routesRouter.post("/route/save", authMiddleware, saveRoute);
routesRouter.delete("/route/delete/:routeId", authMiddleware, deleteRoute);
routesRouter.get("/route/all", authMiddleware, getRoutes);
routesRouter.post("/route/find", getSafeRoutes);

module.exports = routesRouter;
