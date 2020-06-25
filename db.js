const express = require('express')
    const fs = require('fs')
    const path = require('path');
    const app = express();



    app.get('/getJson',function(req,res){
        login();
           
       });
    
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}

}
);





function login (req,res){
  var sql = "INSERT INTO vendor VALUES ('a', 'b','c','d')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  
  }


  app.listen(5000, () => console.log('Example app listening on port 4000!'))