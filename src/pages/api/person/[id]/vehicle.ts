import { NextApiRequest , NextApiResponse } from "next";
import { INFVehicle } from "../../../../../api/VehiclePerson";
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

export default async function getAllVehiclesByPersonId( req: NextApiRequest , res: NextApiResponse ) {
  
    const db = await sqlite.open({
        filename:"./mydb.sqlite",
        driver: sqlite3.cached.Database
    });
    const vehicle: INFVehicle = await db.all(`SELECT * FROM vehicle WHERE ownerId = ? ` , [req.query.id ] ) ;
    console.log(`VEHICLE by PersonId: ${req.query.id}: ` , vehicle );

    res.json(vehicle) ;

    // res.json({ byId: req.query.id ,message: "getAllVehiclesByPersonId" }) ;
};