    const express = require('express')
    const app = express()



app.get('/main', function(req, res) {
  var name = 'hello';
  res.sendfile( "seedusers.html", {name:name});
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))  