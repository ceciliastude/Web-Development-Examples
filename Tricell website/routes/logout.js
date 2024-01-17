const express = require('express');
const router = express.Router();

router.use(express.static('./public'));
const path = require('path');


// --------------------- Läs in Masterframen --------------------------------------------------
const readHTML = require('../readHTML.js');
const fs = require('fs');

var htmlHead = readHTML('./masterframe/head.html');
var htmlHeader = readHTML('./masterframe/header.html');
var htmlInfoStart = readHTML('./masterframe/infoStart.html');
var htmlInfoStop = readHTML('./masterframe/infoStop.html');
var htmlFooter = readHTML('./masterframe/footer.html');
var htmlBottom = readHTML('./masterframe/bottom.html');

// --------------------- Router -----------------------------------------------
router.get('/', function(request, response)
{
 
    request.session.destroy();

    response.clearCookie('employeecode');
    response.clearCookie('name');
    response.clearCookie('lastlogin');
    response.clearCookie('logintimes');
    response.clearCookie('securityAccessLevel');

    response.setHeader('Content-type','text/html');
    response.write(htmlHead);
    response.write(htmlHeader);
    response.write(htmlInfoStart);

    htmlLoginStatus = readHTML('./masterframe/loginstatus_css.html')
    response.write(htmlLoginStatus);
    htmlLoginStatusLogOut = readHTML('./masterframe/loginstatus_logout.html')
    response.write(htmlLoginStatusLogOut);

    response.write(htmlInfoStop);
    response.write(htmlFooter);
    response.write(htmlBottom);
    response.end();
});

module.exports = router;