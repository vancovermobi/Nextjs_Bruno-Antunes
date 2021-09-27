import { INFPeople } from './../../../api/VehiclePerson';
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import sqlite3 from 'sqlite3';
import sqlite ,{ open } from 'sqlite';

// const sqlite = require('sqlite');
// const sqlite3 = require('sqlite3');

export default async function SignUp(req: NextApiRequest, res: NextApiResponse) {
//   const db = await sqlite.open({
//     filename: './mydb.sqlite',
//     driver: sqlite3.cached.Database,
//   });

    const db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.cached.Database
    });


  if (req.method === 'POST') {

    hash( req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.

      const statement = await db.prepare(
        "INSERT INTO person (name, email, password) values (?, ?, ?)"
      );

      const result = await statement.run(
          req.body.name, 
          req.body.email,
        //   req.body.password 
          hash
      );

      result.changes;

      const person: INFPeople = await db.all(`SELECT * FROM person `);
      console.log(`PEOPLE Id: `, person);

      res.json(person);
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }

  // res.json({ byId: req.query.id ,message: "SignUp" }) ;
}
