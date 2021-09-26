const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup(){
    const db = await sqlite.open({
        filename:"./mydb.sqlite",
        driver: sqlite3.cached.Database
    });
    
    await db.migrate({force: 'last'});

    const people = await db.all(`SELECT * FROM person`) ;
    console.log("ALl PEOPLE: " , people );

    const vehicles = await db.all(`SELECT * FROM vehicle`) ;
    console.log("ALl VEHICLE: " , vehicles );
}

setup();