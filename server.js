const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
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
