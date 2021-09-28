import { authenticated } from './people';
import { NextApiRequest , NextApiResponse } from "next";
import { INFVehicle } from "../../../api/VehiclePerson";
// import sqlite  from 'sqlite';
// import sqlite3 from 'sqlite3';
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

export default authenticated(async function getAllVehicles( req: NextApiRequest , res: NextApiResponse ) {
    // if (req.method !== 'GET') {
    //     res.status(500).json({message: "Sory we only accept GET method"}) ;
    // }

    const db = await sqlite.open({
        filename:"./mydb.sqlite",
        driver: sqlite3.cached.Database
    });
    const vehicle: INFVehicle = await db.all(`SELECT * FROM vehicle`) ;
    console.log("ALl VEHICLE: " , vehicle );

    res.json(vehicle) ;
    // res.json({ hello: 'world' , method: req.method }) ;

});