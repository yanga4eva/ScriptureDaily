const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var bookofMormon = require('./Bom')
var Scripture = require('./scripture')



var app = express()

//var logger = function(req, res, next) {
//    console.log('Logging...')
//    next()
//}
//
//app.use(logger)

// View Enger
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
      res.render('index', {
    title: 'Scripture Daily'
    })
})

app.post('/', function (req, res) {
    passage = req.body.passageInput
    

    if (passage.includes(":") == true) {
        var scriptureInput = new Scripture(passage);
        scriptureInput.text = scriptureInput.findverse()
        nex = scriptureInput.nextverse
        previousVer = scriptureInput.previousVerse
        res.render('reading', {
            title: "Scripture Reading",
            passage: passage,
            passagetoread: scriptureInput.text,
            nextVerse: nex,
            previousVerse: previousVer
        })
    } else {
        var scriptureInput = new Scripture(passage);
        scriptureInput.findChapter()
        
        res.render('chapterReading', {
            title: "Scripture Reading",
            passage: passage,
            passagetoread: scriptureInput.chapverses,
            previousChapter: scriptureInput.previousChapter,
            nextChapter: scriptureInput.nextChapter
        })
    }
        
    
})

app.get('/Verse', function (req, res) {
    passage = req.query.next
    var scriptureInput = new Scripture(passage);
    scriptureInput.text = scriptureInput.findverse()
    nex = scriptureInput.nextverse
    previousVer = scriptureInput.previousVerse
    
    res.render('reading', {
        title: "Scripture Reading",
        passage: passage,
        passagetoread: scriptureInput.text,
        nextVerse: nex,
        previousVerse: previousVer
    })
})

app.get('/chapter', function (req, res) {
    passage = req.query.next
    var scriptureInput = new Scripture(passage);
    scriptureInput.findChapter()
    previousChapter = scriptureInput.previousChapter
    scriptureText = scriptureInput.chapverses
    nextChapter = scriptureInput.nextChapter

    res.render('chapterReading', {
        title: "Scripture Reading",
        passage: passage,
        passagetoread: scriptureText,
        previousChapter: previousChapter,
        nextChapter: nextChapter
    })
})


app.listen(3000, function(){
    console.log('Server on')
})
