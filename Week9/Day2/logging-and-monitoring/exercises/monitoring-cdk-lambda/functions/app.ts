import express from "express";
const app = express();

app.use(express.json());

const logger = require("pino")();

logger.info("hello world");

const child = logger.child({ a: "property" });
// child.info('hello child!')

const names = [
  "Rowan",
  "Bob",
  "Greg",
  "Steve",
  "Krom",
  "Miraculous Mark",
  "Secret Peter",
];

app.get("/names", (req, res) => {
  console.log("Hit /Names end point");
  console.log("names be", names);
  logger.child("Names are - ", names);
  res.json(names);
});

// example post body would be {  }
app.post("/names", (req, res) => {
  const body = req.body;
  names.push(body.name);
  res.json(names);
});

app.listen(9091, () => console.log("Server listening on port 9091!"));

export default app;
