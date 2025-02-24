import Express from "express";
import Cors from "cors";
import basic from "./Routers/basic.js";
import accounts from "./Routers/Accounts.js";
import views from "./Routers/Views.js";
import adminPanel from "./Routers/AdminPanels.js";
import cookieParser from "cookie-parser";

const express = Express();
express.use(
  Cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
express.use(Express.json({ limit: "20mb" }));
express.use("/api", basic);
express.use("/api", accounts);
express.use("/api", views);
express.use("/api", adminPanel);
express.use(cookieParser());

express.listen(3001, function () {
  console.log("Сервер  на порту 3001");
});
