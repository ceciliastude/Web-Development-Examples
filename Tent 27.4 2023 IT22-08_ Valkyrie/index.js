const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const session = require('express-session');


// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'your-secret-key' }));

// Set up routes
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

/* ------------------------------ Egna moduler ----------------------------------- */
const readHTML = require('./readHTML.js');

/* Läs respektive HTML-text-sida för Masterframen */
const htmlHead = readHTML('./masterframe/head.html');
const htmlHeader = readHTML('./masterframe/header.html');
const htmlFooter = readHTML('./masterframe/footer.html');
const htmlBottom = readHTML('./masterframe/bottom.html');
const htmlLoginUnsuccess = readHTML('./masterframe/loginunsuccessful.html');
const htmlLoginSuccess = readHTML('./masterframe/loggedinmenu.html');


/* -------------- Skapa default-router (om ingen under-sökväg anges av användaren) --------------------- */
app.get('/', function(request, response) {
  response.setHeader('Content-type','text/html');
  response.write(htmlHead);
  response.write(htmlHeader);
  response.write(htmlFooter);
  response.write(htmlBottom);
  response.end();
});

app.get('/public/css/loginmenu.css', function(request, response) {
  response.setHeader('Content-Type', 'text/css');
  response.sendFile(__dirname + '/public/css/loginmenu.css');
});

app.get('/public/scripts/MD5.js', function(request, response) {
    response.setHeader('Content-Type', 'text/javascript');
    response.sendFile(__dirname + '/public/scripts/MD5.js');
  });

app.get('/loginunsuccessful.html', function(request, response) {
  response.setHeader('Content-type','text/html');
  response.write(htmlHead);
  response.write(htmlLoginUnsuccess);
  response.write(htmlFooter);
  response.write(htmlBottom);
  response.end();
});

app.get('/loggedinmenu.html', function (request, response) 
{

      response.setHeader('Content-type', 'text/html');
      response.write(htmlHead);
      response.write(htmlLoginSuccess);
      response.write(htmlFooter);
      response.write(htmlBottom);
      response.end();
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});