import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
//@ts-ignore
import xss from "xss-clean";

import cookieParser from "cookie-parser";

import cors from "cors";

import { globalErrorHandler } from "./controllers/errorController";

import useragent from "express-useragent";
import jsend from "jsend";

import { handleUnMatchedRoute } from "./utils/common";
// import { caching } from 'cache-manager';
import { getRoutes } from "get-routes";
import catagoryRouter from "./routes/catagoryRouter";
import productRouter from "./routes/productRouter";

// declare global variable
// how to get json file and make it globle variable
const i18n = require("./i18n/i18n.config");

// Start express app
const app: express.Application = express();

app.disabled("trust proxy");

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// useragent log
app.use(useragent.express());

// Implement CORS

const corsOptions = {
  credentials: true, // This is important.
  //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: true,
};

app.use(cors(corsOptions));

// app.use(expressLayouts);

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(jsend.middleware);
app.use(function (req: any, res: any, next: any) {
  if (req.headers && req.headers["accept-language"]) {
    i18n.setLocale(req.headers["accept-language"]);
  }
  req.requestTime = new Date().toISOString();
  return next();
});

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "5120kb" }));
app.use(express.urlencoded({ extended: true, limit: "5120kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//routes
app.use("/api/v1/catagories", catagoryRouter);
app.use("/api/v1/products", productRouter);

const routeList: any = getRoutes(app);
app.all("*", handleUnMatchedRoute(routeList));

app.use(globalErrorHandler);


export default app;

// export const memoryCache1 = async () => {
//   const cache = await caching('memory', { max: 100, ttl: 600, shouldCloneBeforeSet: false });
//   return cache;
// };
