
exports.up = function(knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('plot');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.string('plot', 2000);
    });
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('plot');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.string('plot');
    });
  });
};
