const comments = require('../models/comments.js'); 

module.exports = {
    post: function (request) {
        //pass parameters into model for insert
        let params = request.post;
        let success = comments.create(params);
        return JSON.stringify({success:success});
    },
    get: async function (request) {
        //pass callback to database for processing
        let params = request.get;
        try {
            let json = await comments.list(params);
            return JSON.stringify(json);
        } catch(error) {
            console.log("GET: " + error.message);
        }
    }
};