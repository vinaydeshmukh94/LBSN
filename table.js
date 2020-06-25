const express = require('express')
const app = express()



app.get('/getJson',function(req,res){
    getJson(res);
});


function getJson(res){
var rows = [{
    name: "John",
    age: 20,
    email: "xx@hotmail.com"
}, {
    name: "Jack",
    age: 50,
    email: "xxx@hotmail.com"
}, {
    name: "Son",
    age: 45,
    email: "xxxx@hotmail.com"
}];

var html = "<title>abc </title> <style> #a tr:nth-child(even){background-color: #f2f2f2;}"+

"#a tr:hover {background-color: #ddd;}"+
"#a  {border-collapse: collapse; width: 100%;}"+
"#a td { border: 1px solid #ddd; padding: 8px;}"+
"</style> <table id='a' border=1>"; 
 html+="<tr> <th> Name</th> <th> Age</th> <th> E-mail </th></tr>";   
for (var i = 0; i < rows.length; i++) {
    html+="<tr>";
    html+="<td>"+rows[i].name+"</td>";
    html+="<td>"+rows[i].age+"</td>";
    html+="<td>"+rows[i].email+"</td>";

    html+="</tr>";

}
html+="</table>";

res.send(html);
}
app.listen(4000, () => console.log('Example app listening on port 4000!')) 