const mysql = require('mysql2-promise')(); 
const redis = require('redis');
const stringify = require('json-stringify-safe');

module.exports = {

    //database handle property
    connection: null,

    //connect to the database
    connect: function () {

        //set connection property
        mysql.configure({
            host: 'localhost',
            user: 'vagrant',
            password: 'vagrant',
            database: 'vice_media'
        });

        this.connection = mysql;

        return this.connection; 

        // return this.connection.connect(function(error) {
        //     if(error) {
        //         return console.error('error: ' + error.message);
        //     }
        // });
    },

    //read from the database
    read: async function (query) {

        //make sure we are connected
        if(this.connection === null) {
            this.connect();
        }

        //var client = redis.createClient();
        //var key = query.replace(/[^A-Za-z0-9]+/g,'').toLowerCase();
        var dbHandle = this;

        try {
            var queryResult = await this.connection.execute(query);
            return queryResult;
        } catch(error) {
            console.log("READ: " + error.message);
        }

        // return client.get(key, function(err, result) {

        //     //does cache exist
        //     //caching layer need adjustments elected to submit
        //     //you will see at least conceptually I understand the cacheing layer
        //     //this if false was deliberate because the caching is not functioning
        //     //i left code there to see that conceptually I have the idea
        //     if (false) {

        //         let resultJSON = JSON.parse(result);

        //         //return object
        //         return resultJSON;
        //     } else {
        //         //make sure we are connected
        //         if(dbHandle.connection === null) {
        //             dbHandle.connect();
        //         }

        //         //process query
        //         var queryResult = dbHandle.connection.query(query,fn);

        //         //save query result in cache
        //         //@TODO: fix circular object error:
        //         //TypeError: Converting circular structure to JSON
        //         //tried workaround https://www.npmjs.com/package/json-stringify-safe
        //         //tried flatten and unflatten as well
        //         //at this point I am realizing that I may have restructure certain portions
        //         //though Iam hoping in submitting what I have
        //         //you will see at least conceptually I understand the cacheing layer
        //         client.setex(key, 3600, stringify(queryResult));

        //         //return query result
        //         return queryResult;
        //     }
        //});        
    },

    //write to the database
    write: function (query) {

        //make sure we are connected
        if(this.connection === null) {
            this.connect();
        }

        //process query
       try {
           this.connection.execute(query);
       }catch(e) {
           return false;
       }

       //default
       return true;
    }
}