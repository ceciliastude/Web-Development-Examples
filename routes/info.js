const express = require('express');
const router = express.Router();
router.use(express.json());

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


// --------------------- Default-sida (om ingen info-sida anges) -------------------------------
router.get('/', function(request, response)
{
    response.setHeader('Content-type','text/html');
    response.write(htmlHead);
    if(request.session.loggedin)
    {
        htmlLoggedinMenuCSS = readHTML('./masterframe/loggedinmenu_css.html');
        response.write(htmlLoggedinMenuCSS);
        htmlLoggedinMenuJS = readHTML('./masterframe/loggedinmenu_js.html');
        response.write(htmlLoggedinMenuJS);
        htmlLoggedinMenu = readHTML('./masterframe/loggedinmenu.html');
        response.write(htmlLoggedinMenu);
    }
    response.write(htmlHeader);
    response.write(htmlMenu);
    response.write(htmlInfoStart);

    htmlInfo = readHTML('./public/text/index.html');
    response.write(htmlInfo);

    response.write(htmlInfoStop);
    response.write(htmlFooter);
    response.write(htmlBottom);
    response.end();
});

// --------------------- Läs en specifik info-sida -----------------------------------------------
router.get('/:infotext', function(request, response)
{
    const infotext = request.params.infotext;
    
    response.setHeader('Content-type','text/html');
    response.write(htmlHead);

    if(request.session.loggedin)
    {
        htmlLoggedinMenuCSS = readHTML('./masterframe/loggedinmenu_css.html');
        response.write(htmlLoggedinMenuCSS);
        htmlLoggedinMenuJS = readHTML('./masterframe/loggedinmenu_js.html');
        response.write(htmlLoggedinMenuJS);
        htmlLoggedinMenu = readHTML('./masterframe/loggedinmenu.html');
        response.write(htmlLoggedinMenu);
    }

    response.write(htmlHeader);
    response.write(htmlInfoStart);

    // Kollar om inskickade sidan existerar, annars läs default 
    const filepath = path.resolve(__dirname, "../public/text/"+infotext+'.html');
    if (fs.existsSync(filepath)) 
    { 
        htmlInfo = readHTML('./public/text/'+infotext+'.html');      
    }
    else
    {
        htmlInfo = readHTML('./public/text/index.html');
    }
    response.write(htmlInfo);    
    response.write(htmlInfoStop);
    response.write(htmlFooter);
    response.write(htmlBottom);
    response.end();
});

module.exports = router;