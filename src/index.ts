import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import "reflect-metadata";
import routes from "./routes/index.route";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT;
const serviceName = process.env.SERVICE_NAME;

const httpServer = http.createServer(app);
httpServer.listen(port);

console.log(`[${serviceName}] http server listening at port ${port}`);

export default { app };
