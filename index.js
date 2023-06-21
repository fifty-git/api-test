const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.post("/token", (req, res, next) => {
  const { id } = req.body;
  const user = data.users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const token = jwt.sign({
    sub: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    userTypeId: user.userTypeId,
  });

  return res.status(200).json({
    data: {
      token,
    },
    message: "Token generated successfully",
  });
});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
