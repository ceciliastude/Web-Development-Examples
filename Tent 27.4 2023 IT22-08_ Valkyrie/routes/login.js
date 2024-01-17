const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const readHTML = require('../readHTML.js');

//User database
const rawData = fs.readFileSync('./data/users.json');
const users = JSON.parse(rawData);

const htmlHead = readHTML('./masterframe/head.html');
const htmlHeader = readHTML('./masterframe/header.html'); 
const htmlFooter = readHTML('./masterframe/footer.html');
const htmlBottom = readHTML('./masterframe/bottom.html');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    request.session.user = {
      username: user.username,
      fullName: user.fullName
    };
    response.redirect(`/loggedinmenu.html`);
  } else {
    response.redirect('/loginunsuccessful.html');
  }
});

router.get('/getuser', function(request, response) {
  const user = request.session.user;
  if (user) {
    response.send(user.fullName);
  } else {
    response.redirect('/');
  }
});
module.exports = router;