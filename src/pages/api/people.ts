import { NextApiRequest , NextApiResponse } from "next";
import { INFPeople } from "../../../api/VehiclePerson";
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

export default async function getPeople( req: NextApiRequest , res: NextApiResponse ) {
    if (req.method !== 'GET') {
        res.status(500).json({message: "Sory we only accept GET method"}) ;
    }
    const db = await sqlite.open({
        filename:"./mydb.sqlite",
        driver: sqlite3.cached.Database
    });
    const people: INFPeople = await db.all(`SELECT * FROM person`) ;
    console.log("ALl PEOPLE: " , people );

    // res.json([{ name: "John" }, {email: 'John@gmail.com' }]) ;
    res.json(people) ;
};