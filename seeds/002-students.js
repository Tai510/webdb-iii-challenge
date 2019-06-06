
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: "Tai", cohort_id: 1 },
        { name: "Dawa", cohort_id: 2 },
        { name: "Rihana", cohort_id: 3 },
        { name: "Obama", cohort_id: 4 }
      ]);
    });
};
