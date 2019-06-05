const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db("cohort")
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => {
      res.status(500).json(err)
      console.error(err)
    })

  });


const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);