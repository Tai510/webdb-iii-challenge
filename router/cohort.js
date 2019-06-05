// const router = require('express').Router();
// const knex = require('knex');

// const knexConfig = require('./knexfile.js')
// const db = knex(knexConfig.development);

// server.get('/api/cohorts', async (req, res) => {
    
//     try {
//       const roles = await db('cohorts'); // all the records from the table
//       res.status(200).json(roles);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });