const express = require("express");
const app = express();
const port = 3000;
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require('cors');
app.listen(port, (error) => {
  if (!error) console.log(`Successfully Listen:${port}`);
  else console.log(`Error Occured While Listening to post${port}`);
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
const dbConfig = {
  user: "sa",
  password: "5544332211",
  server: "localhost",
  database: "Portfolio",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

const executeQuery = async function (res, query, params) {
  await poolConnect;
  try {
    const request = pool.request();
    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });
    const result = await request.query(query);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

app.post("/contact", (req, res) => {
  const query =
    "INSERT INTO dbo.[contact] (fullName, email, subject, message) VALUES (@fullName, @Email, @Subject, @Message)";
  const params = [
    { name: "fullName", type: sql.NVarChar, value: req.body.fullName },
    { name: "Email", type: sql.NVarChar, value: req.body.email },
    { name: "Subject", type: sql.NVarChar, value: req.body.subject },
    { name: "Message", type: sql.NVarChar, value: req.body.message },
  ];
  executeQuery(res, query, params);
});
