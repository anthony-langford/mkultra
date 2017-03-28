
exports.up = (knex, Promise) => {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('date');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.bigInteger('date');
    });
  });
}

exports.down = (knex, Promise) => {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('date');
  })
  .then(() => {
    return knex.schema.table('movies', (table) => {
      table.integer('date');
    });
  });
};
