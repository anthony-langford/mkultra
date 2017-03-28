exports.up = (knex, Promise) => {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('name');
    table.string('category');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('items');
};
