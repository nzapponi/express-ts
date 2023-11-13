import debug from "debug";
import express from "express";
import config from "./server/config";

const log = debug("server:server");

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const app = express();
const port = normalizePort(process.env.PORT || "3000");

app.listen(port, () => {
  log(`Listening on port ${port}...`);
});

config(app);
export default app;
