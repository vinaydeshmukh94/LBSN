
const express = require('express')
const path = require('path');
const app = express()


var userid="a1";
var category="coffee";
var city="baramati";
const testFolder = './data/'+city+'/'+category;
const fs = require('fs');
var locationArray = new Array();
var flocationArray = new Array();
var friends = new Array();  //total friends
var finc = new Array();    //friends in cluster

app.use(express.urlencoded())
app.get('/getFriends',function(req,res){
    getfriedns(res);
   
});

//code to get friends
function getfriedns(res){
data = JSON.parse(fs.readFileSync("try_connections.json").toString());
j=0;

let lenght_array = Object.keys(data).length;
        console.log(lenght_array);
       
        for(i=0;i<lenght_array;i++)
        {   if(data[i].userid1==userid)
            {
            friends[j]=data[i].userid2;
            j++; //j is used instead of i because i will give you black/null values in friends array
            }
        }
console.log("friends "+friends);

    

//code to read files in folders
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    if(file != userid+'.json')
    {
        readFile(file);
    }   
  });
  removeDuplicates(locationArray);//to remove duplicate entries in array
  res.send(finc.toString()+"\n"+flocationArray.toString());
//   res.send();
})
}

//to read the data from files of users
function readFile(filename)
{
   let data = JSON.parse(fs.readFileSync(testFolder+'/'+filename));
   let no_friends = Object.keys(friends).length;
    for(i=0;i<no_friends;i++)
   {
      if(filename==friends[i]+'.json')     //to check if friedns in the cluster
      {
          finc.push(friends[i]);              // aary of friends present in the cluster 
          flocationArray.push(data.location);} // array of locations visited by friends;
   }
      {locationArray.push(data.location);}        
}

// to remove duplicates from array
function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }     
    console.log("locations visited by friends");
    let l = Object.keys(flocationArray).length;
    for(i=0;i<l;i++)              // to print the locations with friends visited that locations
    {
      console.log(finc[i]+"--"+flocationArray[i]);
    }
    console.log("other locations "+unique_array);  // to print all the locations
    return unique_array;
}




app.listen(4000, () => console.log('Example app listening on port 4000!'))