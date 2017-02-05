
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      return Promise.all([
        knex.raw( "COPY movies (title) FROM '/vagrant/mkultra/db/seeds/movieseed.csv' WITH CSV DELIMITER ','")
      ]);
    });
};
