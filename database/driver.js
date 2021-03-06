const mysql = require('mysql2-promise')();

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
    },

    //read from the database
    read: async function (query) {

        //make sure we are connected
        if(this.connection === null) {
            this.connect();
        }

        try {
            var queryResult = await this.connection.execute(query);
            return queryResult;
        } catch(error) {
            console.log("READ: " + error.message);
        }     
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