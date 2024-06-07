const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');
const bodyParser = require('body-parser');
app.listen(port,(error)=>{
    if(!error)
        console.log("Successfully Listen");
    else
        console.log(`Error Occured While Listening to post${port}`);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
const dbConfig = {
    user: "sa",
    password: "5544332211",
    server: ".",
    database: "Portfolio"
}
const executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
}

 app.post('/contact',(req,res)=>{
    var query = "INSERT INTO dbo.[Contact] (fullName, email,message,subject) VALUES (req.body.fullName, req.body.email, req.body.subject)";
    executeQuery(res, query);
 });