
exports.up = function(knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('date');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.bigInteger('date');
    });
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('date');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.integer('date');
    });
  });
};
