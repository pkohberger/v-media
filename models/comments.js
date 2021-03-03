const database = require('../database/driver.js'); 

module.exports = {
    create: function (params) {
        //@TODO: add parameter sanitization
        let query = "INSERT INTO comments(ip,text,created) VALUES('" + params.ip + "','" + params.text + "',NOW())";
        return database.write(query);
    },
    list: function (fn) {
        //@TODO: add filtering parameters
        let query  = "SELECT * FROM comments";
        return database.read(query,fn);
    }
}