let mysql = require('mysql');  
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'vagrant',
    password: 'vagrant',
    database: 'vice_media'
});

// Connect with the database
connection.connect(function(e) {

    if (e) {
        return console.error('error: ' + e.message);
    }
    console.log('\nConnected to the MySQL server...\n');
});

// Set the query message
$query = 'SELECT * from comments';


connection.query($query, function(e, rows) {
    if(e) {

    }

    for(let row of rows) {
        console.log(row['ip'],"\t\t",row['session'],"\t","$",row['text']);
    }
});


// Close the database connection
connection.end(function(){
    console.log('\nConnection closed.\n');
});