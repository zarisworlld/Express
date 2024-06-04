const express = require('express');
const app = express();
const port = 3000;
app.listen(port,(error)=>{
    if(!error)
        console.log("Successfully Listen");
    else
        console.log(`Error Occured While Listening to post${port}`);
});

app.get('/',(req,res)=>{
    res.send();
})
 app.post('contact',(req,res)=>{

 });