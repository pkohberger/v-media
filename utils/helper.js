//helper
module.exports = {
    notFound: function (response) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    },
    die: function (response,msg) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(msg);
        response.end();
    },
    processRequest: function (request,service) {
        return service[request.method.toString().toLowerCase()](request);
    }
};