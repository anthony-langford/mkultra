
exports.up = (knex, Promise) => {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('plot');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.string('plot', 2000);
    });
  });
}

exports.down = (knex, Promise) => {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('plot');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.string('plot');
    });
  });
};
