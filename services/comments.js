const comments = require('../models/comments.js'); 

module.exports = {
    post: function (request,response,buffer) {
        //pass parameters into model for insert
        let params = request.post;
        let success = comments.create(params);
        return buffer.die(response,JSON.stringify({success:success}));
    },
    get: async function (request,response,buffer) {
        //pass callback to database for processing
        let params = request.post;
        try {
            let json = await comments.list(params);
            return buffer.die(response,JSON.stringify(json));
        } catch(error) {
            console.log("GET: " + error.message);
        }
    }
};