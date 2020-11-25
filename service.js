//Install express server
const express = require('express');
const path = require('path');

const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/tyro'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/tyro/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 35474);

app.use(forceSSL());


