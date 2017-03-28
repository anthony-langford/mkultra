
exports.up = (knex, Promise) => {
  return Promise.all([
  knex.schema.dropTable('userlist'),
  knex.schema.createTable('useritems', (table) => {
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id');
    table.integer('item_id').unsigned()
    table.foreign('item_id').references('items.id');
    table.string('comment');
  })
  ]);
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('useritems');
};
