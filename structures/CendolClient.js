const { Client } = require("discord.js");

class CendolClient extends Client {
    constructor(opt) {
        super(opt);
      
        this.config = require("../config");
        this.util = require("../utils/util");
        
    }
};

module.exports = CendolClient;