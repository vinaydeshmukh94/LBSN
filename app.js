    const express = require('express')
    const fs = require('fs')
    const path = require('path');
    const app = express()

    var locationArray = new Array();
    var flocationArray = new Array();
    var userid;
    var friends = new Array();  //total friends
    var finc = new Array();    //friends in cluster
    let unique_array = []
    app.use(express.static(__dirname + '/assets'));
    var mkdirp = require('mkdirp');
    var data;
    var index=0;
    
    
    let count=0;
    var counts=new Array();
    var users=new Array();
    var highest=Number.NEGATIVE_INFINITY;
    var seed1,seed2,seed3;
    var friendsforseed=new Array();

  
    app.use(express.urlencoded())
    
    //-----------------------------------------------------creating cluster-----------------------------
    app.get('/getJson',function(req,res){
        getJson();
        res.send("true");
    });
  //=---------------------------------------------------register---------------------------------------

  app.get('/register',function(req,res)
  {
      res.sendFile(path.join(__dirname+'/register.html'));
  });

  app.post('/signup',function(req,res)
  {
    var id=req.body.id;
    var username=req.body.username;
    var password=req.body.password;
    
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection
    ({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb'
    });
    var record=[[id,username,password]];

    connection.query("INSERT INTO users (id,username,password) VALUES ?", [record], function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    });



      res.sendFile(path.join(__dirname+'/index.html'));
  });




//-----------------------------------------vendor side--------------------------------------------------------------------//


    app.post('/vendorip',function(req,res)
    {
        var location=req.body.city;
        var name=req.body.name;
        var category=req.body.category;
        var contact=req.body.contact;

        const testFolder = './data/'+location+'/'+category;
        const fs = require('fs');

        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
              users.push(file);
          
            });
           console.log(users);
           seedselection(users,res,function(seed){

            var mysql      = require('mysql');
            var connection = mysql.createConnection
            ({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'mydb'
            });
            var record=[[name,location,category,contact,seed]];
    
            connection.query("INSERT INTO vendor (name,location,category,contact,seeds) VALUES ?", [record], function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            console.log(result);
            });

           });
          })


        
        
       
    });


    function seedselection(users,res,cb)
    {
        for(let i = 0;i < users.length; i++)
        {
            getfriendsforseed(users[i]);
            for(let j=0;j< friendsforseed.length;j++)
            {
                for(let K=0;K< users.length;K++)
                {
                if(users[K]==friendsforseed[j]+'.json')
                {
                    count++;
                }
            }       
            }
            console.log(count);
            counts.push(count);
            count=0;
            friendsforseed=[];
        }
        getmax(counts);
    
        seed1=users[index];

        console.log("seed1="+seed1);
        var seedArray = seed1.split('.');
       var  seed = seedArray[0];
       var html = "<title>recommendation </title> <style> #a tr:nth-child(even){background-color: #f2f2f2;}"+
       "#a tr:hover {background-color: #ddd;}"+
       "#a  {border-collapse: collapse; width: 60%;}"+
       "#a td { border: 1px solid #ddd; padding: 8px;}"+
       "ul {list-style-type: none; margin: 0;padding: 0;overflow: hidden;background-color: #7533FF;}"+
       "li {float:center}"+
       " nav{height:50px;}"+
       ".nav a{ color: white !important; font-size: 2em !important;}"+
       "a {padding:100px; color: white; font-size: 1.6em;}"+
       "p.sansserif {   font-family: Arial, Helvetica, sans-serif;   }"+



       "</style>";

       html+="<nav > <ul> <li height:50px style='color:white'> <a><center><font size='10'>Profile</font></center></a> </li> "+
       "<li><a  href='/search'>Search Locations</a></li></ul> <br>"+
       "<center><h1>Seed users</h1></center>";        
       html+="<body><center><h1>Location promoted to " +seed+"</h1><center></body>";

       res.send(html);
        cb(seed);
    }
    
    
    
    
    function getfriendsforseed(user){
    
        
        data = JSON.parse(fs.readFileSync("file.json").toString());
    j=0;
    
    let lenght_array = Object.keys(data).length;
            for(i=0;i<lenght_array;i++)
            {   if(data[i].userid1+'.json'==user)
                {
                friendsforseed[j]=data[i].userid2;
                j++; //j is used instead of i because i will give you black/null values in friends array
                }
            }
    console.log("friends "+friendsforseed);
    }
    
    
    
    function getmax(counts)
    {
        var temp;
        
        for(let i = 0;i < counts.length; i++)   
        {
            tmp=counts[i];
            if(tmp>highest) 
            {
                highest=tmp;
                index=i
            }
        }
        console.log("highest "+highest);
        console.log("index "+index);

    
    }
    

//------------------------------------------------------------------------------------------------------------------------------------


    app.get('/search',function(req,res)
    {
        res.sendFile(path.join(__dirname+'/search.html'));
    });
  
    app.get('/getFirends',function(req,res)
    {
        getFriends(res,req.query.category,req.query.city);  
    });



    //----------------------------------------output----------------------------------------------------------------


    app.get('/output',function(req,res){
        // output(res,userid,req.query.category,req.query.city);
        var html = "<title>recommendation </title> <style> #a tr:nth-child(even){background-color: #f2f2f2;}"+

        "#a tr:hover {background-color: #ddd;}"+
        "#a  {border-collapse: collapse; width: 60%;}"+
        "#a td { border: 1px solid #ddd; padding: 8px;}"+
        "ul {list-style-type: none; margin: 0;padding: 0;overflow: hidden;background-color: B008AF;}"+
        "li {float:center}"+
        " nav{height:50px;}"+
        "a {padding:100px;}"+
       

        "</style>";

        html+="<nav> <ul> <li height:50px style='color:white'> <a><center>Results</center></a> </li></ul> <br>"+
        "<center><h1>Location visited by Friends</h1></center>";        
        
        html+="<table id='a' border=1 align='center'>"; 
        html+="<tr> <th> Friends</th> <th> Visited Locations</th></tr>";   
        
        for (var i = 0; i < finc.length; i++) {
            html+="<tr>";
            html+="<td>"+finc[i]+"</td>";
            html+="<td>"+flocationArray[i]+"</td>";
        
            html+="</tr>";
        
        }
        html+="</table>";
        html+="<center><h1> All location in same area</h1></center>";
        html+="<table id='a' border=1 align='center'>"; 
        html+="<tr>";
        html+="<th>Locations</th>";
        html+="</tr>";
        
        for (var i = 0; i < unique_array.length; i++) {
            html+="<tr>";
            html+="<td>"+unique_array[i]+"</td>";
            html+="</tr>";
        
        }
        html+="</table>";




        res.send(html);
        }
        );
    
    app.post('/login',function(req,res)
    {
       console.log(req.body);


        var mysql      = require('mysql');
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'mydb'
        });
        
        var username = req.body.username;
        var password = req.body.password;
       
        userid=username;
        connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
        if (error) 
        {
            res.sendFile(path.join(__dirname+'/erro3.html'));

            console.log("failed");
        }
        else
        {
          // console.log('The solution is: ', results);
          if(results.length >0)
          {
            if(results[0].password == password)
            {
                if(results[0].id=='c')
                {
                    var mysql      = require('mysql');
                    var connection = mysql.createConnection({
                      host     : 'localhost',
                      user     : 'root',
                      password : '',
                      database : 'mydb'
                    });
            
                   
                    connection.query('SELECT * FROM vendor WHERE seeds = ?',[username], function (error, results, fields) {
                    if (error) 
                    {
                        console.log("failed");
            
                    }
                    else
                    {
                      // console.log('The solution is: ', results);
                      console.log(results);
                      if(results.length >0)
                      {
                      
                            var html = "<title>recommendation </title> <style> #a tr:nth-child(even){background-color: #f2f2f2;}"+
                    "#a tr:hover {background-color: #ddd;}"+
                    "#a  {border-collapse: collapse; width: 60%;}"+
                    "#a td { border: 1px solid #ddd; padding: 8px;}"+
                    "ul {list-style-type: none; margin: 0;padding: 0;overflow: hidden;background-color: #7533FF;}"+
                    "li {float:center}"+
                    " nav{height:50px;}"+
                    ".nav a{ color: white !important; font-size: 2em !important;}"+
                    "a {padding:100px; color: white; font-size: 1.6em;}"+
                    "p.sansserif {   font-family: Arial, Helvetica, sans-serif;   }"+


            
                    "</style>";
            
                    html+="<nav > <ul> <li height:50px style='color:white'> <a><center><font size='10'>Profile</font></center></a> </li> "+
                    "<li><a  href='/search'>Search Locations</a></li></ul> <br>"+
                    "<center><h1>Notifications</h1></center>";        
                    
            
                    html+="<table id='a' border=1 align='center'>"; 
                    html+="<tr>";
                    html+="<th>Name</th><th>Location</th><th>Category</th><th>Contact</th>";
                    html+="</tr>";
                    
                    for (var i = 0; i < results.length; i++) {
                        html+="<tr>";
                        html+="<td>"+results[i].name+"</td>";
                        html+="<td>"+results[i].location+"</td>";
                        html+="<td>"+results[i].category+"</td>";
                        html+="<td>"+results[i].contact+"</td>";
                        html+="</tr>";
                    
                    }
                    html+="</table>";
                    res.send(html);
            
                      
                      }
                        else{
                            var html = "<title>recommendation </title> <style> #a tr:nth-child(even){background-color: #f2f2f2;}"+
                    "#a tr:hover {background-color: #ddd;}"+
                    "#a  {border-collapse: collapse; width: 60%;}"+
                    "#a td { border: 1px solid #ddd; padding: 8px;}"+
                    "ul {list-style-type: none; margin: 0;padding: 0;overflow: hidden;background-color: #7533FF;}"+
                    "li {float:center}"+
                    " nav{height:50px;}"+
                    ".nav a{ color: white !important; font-size: 2em !important;}"+
                    "a {padding:100px; color: white; font-size: 1.6em;}"+
                    "p.sansserif {   font-family: Arial, Helvetica, sans-serif;   }"+


            
                    "</style>";
            
                    html+="<nav > <ul> <li height:50px style='color:white'> <a><center><font size='10'>Profile</font></center></a> </li> "+
                    "<li><a  href='/search'>Search Locations</a></li></ul> <br>"+
                    "<center><h1>Notifications</h1></center>";        
                    html+="<body><h1>No New Notification</h1></body>";
            
                    
                    res.send(html);
            
                                
                            console.log("No Notifications available");
                        
                        
                        
                            }
                    }
                    });
            
                            }
                else
                {
                    res.sendFile(path.join(__dirname+'/vendors.html'));
                }
            }
            else
            {
                res.sendFile(path.join(__dirname+'/erro2.html'));
                console.log("email or password does not match");
            }
          }
            else{res.sendFile(path.join(__dirname+'/erro2.html'));}
        }
        });
    });
   //---------------------------------------------defult page---------------------------------------------------------------
       

    app.get('/',function(req,res)
    {
        res.sendFile(path.join(__dirname+'/index.html'));
    });
//--------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------clustering--------------------------------------------------
    function getJson(data)
    {      
        data = JSON.parse(fs.readFileSync("changed.json").toString());
        let i = 0;
        let lenght_array = Object.keys(data).length;
        console.log(lenght_array);
        //document.write(lenght_array);
        for(i=0;i<lenght_array;i++)
        {
            var dir="data/"+data[i].city+"/"+data[i].category;
            var file="data/"+data[i].city+'/'+data[i].category+"/"+data[i].userid+".json";
           addDataToCluster(dir,file,data[i]);
        }   


    }


    function addDataToCluster(dir,file,data)
    {
      
        mkdirp(dir,function(err,made)
        {
            if(err)
            {console.log(err);} 
            else 
            {
                fs.writeFileSync(file,JSON.stringify(data,null,4));
                return;
               console.log(made);
            } 
        });
    }

//get friends



    function getFriends(res,category,city)
    {
        friends=[];
        finc=[];
        flocationArray=[];
        locationArray=[];
        const testFolder = './data/'+city+'/'+category;
        data = JSON.parse(fs.readFileSync("file.json").toString());
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
        fs.readdir(testFolder, (err, files) => 
        {
            files.forEach(file => 
            {
                if(file != userid+'.json')
                {
                    readFile(testFolder,file);
                }   
            });
            unique_array=[];
        removeDuplicates(locationArray);//to remove duplicate entries in array
        res.send(finc.toString()+"\n"+flocationArray.toString());
        })

    }   





    //to read the data from files of users
    function readFile(testFolder,filename)
    {   
        let data = JSON.parse(fs.readFileSync(testFolder+'/'+filename));
        let no_friends = Object.keys(friends).length;
            for(i=0;i<no_friends;i++)
            {
                if(filename==friends[i]+'.json')     //to check if friedns in the cluster
                {
                    finc.push(friends[i]);              // aary of friends present in the cluster 
                    flocationArray.push(data.location);
                } // array of locations visited by friends;
            }
                {locationArray.push(data.location);}        
    }



    // to remove duplicates from array
    function removeDuplicates(arr)
    {           unique_array=[];

        
        for(let i = 0;i < arr.length; i++)
        {
        if(unique_array.indexOf(arr[i]) == -1)
        {
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