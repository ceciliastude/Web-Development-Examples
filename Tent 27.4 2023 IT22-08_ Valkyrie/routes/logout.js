const express = require('express');
const router = express.Router();

router.use(express.static('./public'));
const path = require('path');

const readHTML = require('../readHTML.js');
const fs = require('fs');

var htmlHead = readHTML('./masterframe/head.html');
var htmlHeader = readHTML('./masterframe/header.html');
var htmlFooter = readHTML('./masterframe/footer.html');
var htmlBottom = readHTML('./masterframe/bottom.html');


router.get('/', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });

module.exports = router;