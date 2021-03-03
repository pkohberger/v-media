# vice media

hard dependencies:   
    must have mysql, npm, node.js, and redis server installed
    make sure redis server and mysql are running

steps to run:
    unzip file to working directory
    run:
        `cd your_directory`
        `mysql -u username -p < init.sql`
        `npm install`
        `node server.js`

    api test calls:
        GET: 
            `curl http://<YOUR_IP>:3333/services/comments`
        POST:
            `curl --data "text=I love programming wooo&ip=127.0.0.1" http://<YOUR_IP>:3333/services/comments`