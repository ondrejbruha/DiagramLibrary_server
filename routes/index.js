var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        appplicationName: "Diagram Library",
        description: "This is our semestral project on Unicorn University, subject Architecture of Cloud Applications.",
        authors: ["Ondrej Bruha", "Vitezslav Hromek","Jan Novy","Martin Zaluda", "Martin Golan"]
    });
});

module.exports = router;
