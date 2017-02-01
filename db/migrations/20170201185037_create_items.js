exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments();
    table.string('name');
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
