class Util {  
    
    static getRandInt (int) {
        return Math.floor(Math.random() * int);
    }
  
    static clean (text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
          return text;
    }
  
    static chunk (array, chunkSize){
        const temp = [];
        for(let i = 0; i < array.length; i+= chunkSize){
            temp.push(array.slice(i, i+chunkSize));
        }
        return temp;
    }
}

module.exports = Util;