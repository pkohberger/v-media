const comments = require('../models/comments.js'); 

module.exports = {
    post: function (request,response,buffer) {
        //pass parameters into model for insert
        let params = request.post;
        let success = comments.create(params);
        buffer.die(response,JSON.stringify({success:success}));
    },
    get: function (request,response,buffer) {
        //pass callback to database for processing
        return comments.list(function(error,rows) {
            let json = [];
            for(let row of rows) {
                json.push({
                    ip: row['ip'],
                    text: row['text']
                });
            }
            buffer.die(response,JSON.stringify(json));
        });
    }
};