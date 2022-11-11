const express = require("express");
const app = express();
const urlsRouter = require("./urls/urls-router");
const usesRouter = require("./uses/uses.router");

app.use(express.json());

app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);
app.use((req, res, next) => {
  return next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
});

app.use((error, req,res,next)=>{
  console.log(error)
  const {status = 404, message = "Something is wrong"} = error
  res.status(status).json({error: message})
})
module.exports = app;
