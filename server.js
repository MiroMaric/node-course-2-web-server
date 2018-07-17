const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//middleware
app.use((req,res,next)=>{
    var log = `${new Date().toString()}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append file');
        }
    })
    next();
});
/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('toUpperCase',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome!',
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.listen(3000);
