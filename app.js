const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');
app.listen(port,(error)=>{
    if(!error)
        console.log("Successfully Listen");
    else
        console.log(`Error Occured While Listening to post${port}`);
});
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
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
    var query = "INSERT INTO [Contact] (fullName, email,message,subject) VALUES (req.body.fullName, req.body.email, req.body.subject)";
    executeQuery(res, query);
 });