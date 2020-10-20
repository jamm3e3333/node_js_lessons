const express = require('express');
const router = express.Router();

router.get('',(req, res) => {
    res.render('index',{
        title: 'Jakub Vala'
    });
});

router.get('/register',(req, res) => {
    res.render('register',{
        title: 'Jakub Vala'
    });
});

module.exports = router;