const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin) {
          return callback(null, true);
      }

      if (whitelist.indexOf(origin) === -1) {
          var msg = 'The CORS policy for this site does not ' +
              'allow access from the specified Origin.';
          return callback(new Error(msg), false);
      }
      return callback(null, true);
  }
}

// end
app.use(cors(corsOptions));

app.use(express.static(__dirname + '/www/'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/www/index.html'));});
app.listen(process.env.PORT || 8080);
