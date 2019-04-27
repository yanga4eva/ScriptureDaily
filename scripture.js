var bookofMormon = require('./Bom') 

module.exports = class Scripture {
    constructor(passage) {
        this.book = passage.substring(0, passage.indexOf(" "));
        this.chapter = passage.split(':')[0];
        this.seperator = ":";
        this.verse = passage.split(':')[1];
        this.passage = passage;
        this.verseIndex;
        this.text;
        this.nextverse;
        this.previousVerse;
        this.chapverses = [];
        this.nextChapter;
        this.previousChapter;
        this.chapterVerses = [];
    }

    findverse() {
        var i = 0;
        for (i = 0; i < bookofMormon.verses.length; i++) {
            if (bookofMormon.verses[i].reference == this.passage) {
                this.nextverse = bookofMormon.verses[(i + 1)].reference
                this.previousVerse = bookofMormon.verses[(i-1)].reference
                return (bookofMormon.verses[i].text);
                    
                    }
                }
    }

    findChapter() {
        var i = 0;
        for (i = 0; i < bookofMormon.verses.length; i++) {
            if (bookofMormon.verses[i].reference.includes((this.chapter + this.seperator)) === true) {
                this.chapterVerses.push((i + 1))
                this.previousChapter = bookofMormon.verses[(i - this.chapterVerses.length)].reference.split(':')[0]
                this.nextChapter = bookofMormon.verses[i+1].reference.split(':')[0]
                this.chapverses.push(bookofMormon.verses[i].text)
            }
        }
    }
        } 
