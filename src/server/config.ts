import compression from "compression";
import cookieParser from "cookie-parser";
import debug from "debug";
import express, { Express, NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import apiRouter from "../routes/api";

const log = debug("server:server");

const config = (app: Express) => {
  // Express Configuration goes here

  app.use(compression());
  app.use(
    logger("dev", {
      stream: {
        write: (msg) => log(msg),
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api", apiRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new createError.NotFound();
    next(err);
  });

  // error handler
  app.use(
    (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
      const payload: {
        [key: string]: any;
      } = {
        message: err.message,
        status: err.status,
      };
      if (req.app.get("env") === "development") {
        payload.error = err;
      }

      // render the error page
      res.status(err.status || 500);
      res.json({
        ok: false,
        error: payload,
      });
    }
  );
};

export default config;
