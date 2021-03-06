const database = require('../database/driver.js'); 

module.exports = {
    create: function (params) {
        //@TODO: add parameter sanitization
        let query = "INSERT INTO comments(ip,text,created) VALUES('" + params.ip + "','" + params.text + "',NOW())";
        return database.write(query);
    },
    list: async function (params) {
        //@TODO: add filtering parameters
        let query  = "SELECT * FROM comments";
        try {
            var result = await database.read(query);
            
            //iterate results
            var json = [];
            for (let rows of result) {
                if(typeof rows[Symbol.iterator] !== 'function') {
                    continue;
                }
                for(let row of rows) {
                    //bypass metadata
                    if(typeof row.ip === 'undefined' && typeof row.text === 'undefined') {
                        break;
                    }

                    //store row data
                    json.push({
                        ip: row.ip,
                        text: row.text
                    });
                }
            }

        } catch(error) {
            console.log("LIST: " + error.message);
        }

        return json;
    }
}