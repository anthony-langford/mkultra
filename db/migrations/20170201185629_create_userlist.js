
exports.up = function(knex, Promise) {
  return knex.schema.createTable('userlist', function(table) {
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id');
    table.integer('item_id').unsigned()
    table.foreign('item_id').references('items.id');
    table.string('comment');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userlist');
};
