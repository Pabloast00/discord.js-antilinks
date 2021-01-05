var data = require('./links');

    /**
     * @constructor
      */
    function AntiLink(locale) {
        if(!locale)
            locale = 'http';
        this.list = data[locale];
    }
    
    /**
     * @param {*} words 
     * @param {*} text 
     */
    function clean_text (text){
    text = text.replace ("أ","ا")
        .replace ("إ","ا")
        .replace ("ٌ","")
        .replace ("ُ","")
        .replace ("ً","")
        .replace ("َ","")
        .replace ("ٍ","")
        .replace ("ْ","")
        .replace ("ّ","")
        .replace ("ة","ه")
        .replace ("ِ","");

        return text;
    }

    /**
     * @param {string} word 
     */
    AntiLink.prototype.isProfaneLike = function (word) {
        var isProfane = false;
        word = clean_text(word);

        if (this.list.some(function(v) { return (word == v); })) {
            isProfane = true;
        } else {
            isProfane = false;
        }
        return isProfane;
    }   

    /**
     * @param {string} string 
     */
    AntiLink.prototype.replaceWord = function (string) {
        return "*".repeat(string.length);
    };

    /**
     * @param {string} string 
     */
    AntiLink.prototype.clean = function (string) {
        return string.split(' ').map(function(word) {
            return this.isProfaneLike(word) ? this.replaceWord(word) : word;
        }.bind(this)).join(' ');
    };

    /**
     * @param {string} string - Sentence to filter.
     */
    AntiLink.prototype.count = function (string) {
        var count = 0;
        string.split(' ').map(function(word) {
        if(this.isProfaneLike(word)) 
            count++;
        }.bind(this));
        return count;
    };

    /**
     * @param {string} string
     */
    AntiLink.prototype.check = function (string) {
        var isProfane = false;
        string.split(' ').some(function(word) {
            if(this.isProfaneLike(word)) 
                {isProfane = true;
                return true;}
        }.bind(this));
        return isProfane;
    };
    
    /**
     * @param {string} string
     */
    AntiLink.prototype.percent = function (string) {
        var count = 0;
        string.split(' ').map(function(word) {
        if(this.isProfaneLike(word)) 
            count++;
        }.bind(this));
        var stringLength = string.split(' ').length;

        return count / stringLength *100;
    };

module.exports = AntiLink;
