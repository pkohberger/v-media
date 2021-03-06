const database = require('../database/driver.js');
const util = require('util');
const redis = require('redis');

module.exports = {
    create: function (params) {
        //@TODO: add parameter sanitization
        let query = "INSERT INTO comments(ip,text,created) VALUES('" + params.ip + "','" + params.text + "',NOW())";
        
        //destroy cache based on key
        var client = redis.createClient();
        client.del("SELECT * FROM comments".replace(/[^A-Za-z0-9]+/g,'').toLowerCase());

        //return write result
        return database.write(query);
    },
    list: async function (params) {
        //@TODO: add filtering parameters
        var query  = "SELECT * FROM comments";
        var key = query.replace(/[^A-Za-z0-9]+/g,'').toLowerCase();

        //get redis client and create key bsaed on query
        var client = redis.createClient();
        client.get = util.promisify(client.get);

        //attempt to get cached result based on key
        var result = await client.get(key);

        if(result) {
            console.log('CACHE HIT!!!');
            //return parsed json
            return JSON.parse(result);
        }

        console.log('CACHE MISS!!!'); 
        //run query
        result = await database.read(query);

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

        //store query results as string in cache
        client.set(key,JSON.stringify(json));

        //return json object results
        return json;
    }
}