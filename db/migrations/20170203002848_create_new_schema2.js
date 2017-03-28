exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
  })
  .then(() => {
    return knex.schema.createTable('movies', (table) => {
      table.increments();
      table.string('title');
      table.integer('year');
      table.float('rating');
      table.string('poster');
      table.string('genres');
      table.string('rated');
      table.string('director');
      table.string('runtime');
      table.string('plot');
      table.integer('date');
    })
  })
  .then(() => {
    return knex.schema.createTable('searches', (table) => {
      table.string('input');
      table.string('comment');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('movie_id').unsigned();
      table.foreign('movie_id').references('movies.id');
    })
  })
};

exports.down = (knex, Promise) => {
  knex.raw('DROP TABLE users CASCADE');
  knex.raw('DROP TABLE movies CASCADE');
  knex.schema.dropTable('searches');
};
