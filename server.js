const http = require('http');
const url = require('url');
const queryString = require('querystring');

//helper
const buffer = {
    notFound: function(response) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    },
    die: function(response,msg) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(msg);
        response.end();
    }
};

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
            request.post = queryString.parse(body);
            //call service function name based on request method
            output = service[request.method.toString().toLowerCase()](request,response,buffer);
        });
    } 
    
    //process GET
    if (request.method == 'GET') {
        //call service function name based on request method
        output = service[request.method.toString().toLowerCase()](request,response,buffer);
    }

}).listen(3333,function(){
    console.log('Server running on port 3333');
});