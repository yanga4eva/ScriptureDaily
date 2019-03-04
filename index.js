var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var bookofMormon = require('./Bom')


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
    var inputPassage = req.body.passageInput
    chapterBlock = []
    var chapterLook;
    function findverse() {
        if (inputPassage.includes(":") === true) {
            for (i = 0; i < bookofMormon.verses.length; i++) {
                if (bookofMormon.verses[i].reference == inputPassage) {
                    return (bookofMormon.verses[i].text)
                }
            }
        } else if (inputPassage.includes(":") === false) {
            for (i = 0; i < bookofMormon.verses.length; i++) {
                chapterLook = inputPassage + ":"
                if (bookofMormon.verses[i].reference.includes(chapterLook) === true) {
                    chapterBlock.push(bookofMormon.verses[i].text)
                }
            } return chapterBlock
        }
        
    }

    scriptureArray = findverse()
    if (inputPassage.includes(":") === true) {
        res.render('reading', {
            title: "Scripture Reading",
            passage: inputPassage,
            passagetoread: scriptureArray
        })
    } else if (inputPassage.includes(":") === false) {
        res.render('chapterReading', {
            title: "Scripture Reading",
            passage: inputPassage,
            passagetoread: scriptureArray
        })
    }
    
})

app.post('/nextVerse', function (req, res) {
    var inputPassage = body.scripture_head
    function nextVerse() {
        for (i = 0; i < bookofMormon.verses.length; i++) {
            if (bookofMormon.verses[i].reference == inputPassage) {
                return (bookofMormon.verses[(i + 1)].text)
            }
        }
    }

    scriptureArray = nextVerse()
    res.render('reading', {
        title: "Scripture Reading",
        passage: inputPassage,
        passagetoread: scriptureArray
    })
})


app.listen(3000, function(){
    console.log('Server on')
})