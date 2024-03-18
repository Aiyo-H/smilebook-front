const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Serve static assets from the dist folder
app.use(serveStatic(path.join(__dirname, 'dist')));

// Handle SPA routing by returning the index file for all routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('Server started on port ' + port);