const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/students', (req, res) => {
    db("students")
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => {
      res.status(500).json(err)
      console.error(err)
    })
  });

  server.post('/api/students', (req, res) => {
    db("students").insert(req.body, "id")
    .then(ids => {
      db("students")
      .where({id: ids[0]})
      .first()
      .then(cohort => {
        res.status(201).json(cohort)
      })
    }).catch(err => {
      res.status(500).json(err)
    })
  });

  server.get('/api/students/:id', (req, res) => {
    db("students")
    .where({id: req.params.id})
    .first()
    .then(cohort => {
      if (cohort) res.status(200).json(cohort)
      else res.status(404).json("Cohort not found")
    }).catch(err => {
      res.status(500).json(err)
    })
  });
  
  server.get('/api/students/:id/cohort', (req, res) => {
    db("students")
    .where({cohort_id: req.params.id})
    .then(students => {
      if (students) res.status(200).json(students)
      else res.status(404).json("Cohort not found")
    }).catch(err => {
      res.status(500).json(err)
    })
  });
  
  server.put('/api/students/:id', (req, res) => {
    const changes = req.body;
    db("students")
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
      if (count > 0) {
        db("students")
        .where({id: req.params.id})
        .first()
        .then(cohort => {
          res.status(200).json(cohort)
        }) 
      } else {
        res.status(404).json("Cohort not found")
      }
    }).catch(err => {
      res.status(500).json(err)
    })
  });
  
  server.delete('/api/students/:id', (req, res) => {
    db("students")
    .where({id: req.params.id})
    .del()
    .then(count => {
      if (count > 0) res.status(204).end()
      else res.status(404).json("Cohort not found")
    }).catch(err => {
      res.status(500).json(err)
    })
  });  


const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);