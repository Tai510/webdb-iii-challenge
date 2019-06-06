exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort')
  .truncate() // reset the primary key back to 1 in addition to deleting the data
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {name: 'Web19'},
        {name: 'Web20'},
        {name: 'Web21'}
      ]);
    });
};