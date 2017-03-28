
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.raw('DROP TABLE items CASCADE'),
    knex.raw('DROP TABLE users CASCADE'),
    knex.raw('DROP TABLE useritems CASCADE')
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users',  (table) => {
      table.increments()
      table.string('name')
    }),
    knex.schema.createTable('items', (table) => {
      table.increments();
      table.string('name');
      table.string('category');
    }),
    knex.schema.createTable('useritems', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id');
      table.integer('item_id').unsigned()
      table.foreign('item_id').references('items.id');
      table.string('comment');
    })
  ]);
};
