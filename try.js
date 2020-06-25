
var category="coffee";
var city="baramati"
var index=0;
const testFolder = './data/'+city+'/'+category;
const fs = require('fs');
let count=0;
var counts=new Array();
var users=new Array();
var highest=Number.NEGATIVE_INFINITY;
var seed1,seed2,seed3;
var friendsforseed=new Array();

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      users.push(file);
  
    });
   console.log(users);
   seedselection(users);
  })
  


function seedselection(users)
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
}




function getfriendsforseed(user){

    
    data = JSON.parse(fs.readFileSync("try_connections.json").toString());
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
