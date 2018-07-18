const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000; //zbog heroku cloud-a

hbs.registerPartials(__dirname + '/views/partials'); //podesavanje putanje do parcijalnih delova koje importujemo u ostale web stranice
app.set('view engine','hbs'); //setovanje view engina 

//middleware
app.use((req,res,next)=>{
    var log = `${new Date().toString()}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append file');
        }
    });
    next();
});
/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname + '/public'));

//helper metode koje pozivamo iz html fajlova
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

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects Page'
    });
});

app.listen(port,()=>{
    console.log(`Server is up to port ${port}`);
});


/*
git init
git status
git add ...
.gitignore fajl - bitno
git commit -m "..."
git add .

SSH protokol (Secure Shell)

git push
heroku create
git push heroku
heroku open

promena u server.js fajlu-broj porta
promena u 
*/