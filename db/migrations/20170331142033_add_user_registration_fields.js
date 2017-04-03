
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('email');
      table.string('password');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('users', (table) => {
        table.dropColumn('email');
        table.dropColumn('password');
    })
  ]);
};
