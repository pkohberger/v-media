# vice media

hard dependencies:   
    must have mysql, npm, node.js, and redis server installed
    make sure redis server and mysql are running

steps to run:
    unzip file to working directory
    run:<br/>
        `cd your_directory`<br/>
        `mysql -u username -p < init.sql`<br/>
        `npm install`<br/>
        `node server.js`

    api test calls:
        GET: 
            `curl http://<YOUR_IP>:3333/services/comments`
        POST:
            `curl -X POST -d "text=I love programming&ip=127.0.0.1" http://<YOUR_IP>:3333/services/comments`