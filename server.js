const http = require('http');
const url = require('url');
const queryString = require('querystring');
const buffer = require('./utils/helper');

http.createServer(function(request,response) {

    //output request info
    console.log('Request: ' + request.method.toString() + ': ' + request.url.toString().trim());

    //parse request path
    var parts = url.parse(request.url,true);
    var serviceName =  __dirname + '/' + parts.pathname.toString().trim().replace(/(^\/|\/$)/g,'') + '.js' ;

    //instantiate service
    try {
        var service = require(serviceName);
    } catch(error) {
        console.log(error.message);
    }

    //bail if not exists
    if(typeof service === 'undefined') {
        buffer.notFound(response);
        return;
    }

    //response output
    var output = '';

    //if post request we need additional processing
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function(data) {
            body += data;
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });
        request.on('end', function() {
            //set post property
            request.post = queryString.parse(body);
            //call service function name based on request method
            output = buffer.processRequest(request,service);
            buffer.die(response,output);
        });
        return;
    } 
    
    //process GET
    if (request.method == 'GET') {
        //set get property
        request.get = queryString.parse(request.url,true);
        //call service function name based on request method
        output = buffer.processRequest(request,service);
        buffer.die(response,output);
        return;
    }

}).listen(3333,function(){
    console.log('Server running on port 3333');
});