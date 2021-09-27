import { NextApiHandler, NextApiRequest , NextApiResponse } from "next";
import { INFPeople } from "../../../api/VehiclePerson";
import sqlite3 from 'sqlite3';
import sqlite ,{ open } from 'sqlite';
import { verify } from 'jsonwebtoken';
import { secret } from '../../../api/secret';

// const sqlite = require('sqlite');
// const sqlite3 = require('sqlite3');
export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    verify(req.headers.authorization!, secret, async function(err, decoded) {
        if (!err && decoded) {
          return await fn(req, res);
        }
    
        res.status(401).json({ message: 'Sorry you are not authenticated' });
      });
};

export default authenticated (async function getPeople( req: NextApiRequest , res: NextApiResponse ) {
    if (req.method !== 'GET') {
        res.status(500).json({message: "Sory we only accept GET method"}) ;
    }
    const db = await open({
        filename:"./mydb.sqlite",
        driver: sqlite3.cached.Database
    });
    const people: INFPeople = await db.all(`SELECT id, name, email FROM person`) ;
    console.log("ALl PEOPLE: " , people );

    // res.json([{ name: "John" }, {email: 'John@gmail.com' }]) ;
    res.json(people) ;
});