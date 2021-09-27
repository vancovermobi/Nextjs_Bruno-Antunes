import { INFPeople } from './../../../api/VehiclePerson';
import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import sqlite3 from 'sqlite3';
import sqlite ,{ open } from 'sqlite';
import {sign } from 'jsonwebtoken' ;
import { secret } from '../../../api/secret';
// const jwt = require('jsonwebtoken');

// const sqlite = require('sqlite');
// const sqlite3 = require('sqlite3');

export default async function LogIn(req: NextApiRequest, res: NextApiResponse) {
//   const db = await sqlite.open({
//     filename: './mydb.sqlite',
//     driver: sqlite3.cached.Database,
//   });

    const db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.cached.Database
    });


  if (req.method === 'POST') {
    const person  = await db.get(`SELECT * FROM person WHERE email = ? ` , [req.body.email ] ) ;
    // console.log(res.json(person)) ;
    compare( req.body.password, person.password, async function (err, result) {
      // Store hash in your password DB.
      console.log(result) ;
        if(!err && result){
            const claims = {sub: person.id , myPersonEmail: person.email } ;
            const jwt = sign(
                             claims, 
                             secret, 
                             { expiresIn: '1h' }
            );

            res.json({message: "OK" , authToken: jwt });
        }else {
            res.json({message: "Ops , something went wrong !"}); 
        }      
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }

}
