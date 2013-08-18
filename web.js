var fs = require('fs');
var express = require('express');
var app = express();
app.use(express.logger());

// read helloworld string from file


var fileName = "index.html";
fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);
          console.log(data);

          app.get('/', function(request, response) {
            response.send(data);
          });


          fs.close(fd);
        });
      });
    });
  }
});




//app.get('/', function(request, response) {
//  response.send('Hello World 2!');
//});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


