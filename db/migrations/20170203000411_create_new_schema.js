exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
  })
  .then(() => {
    return knex.schema.createTable('searches', (table) => {
      table.string('comment');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('movie_id').unsigned();
      table.foreign('movie_id').references('movies.id');
    })
  })
};

exports.down = function(knex, Promise) {
  knex.raw('DROP TABLE users CASCADE');
  knex.schema.dropTable('searches');
};
