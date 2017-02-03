
exports.up = function(knex, Promise) {
  return knex('users').insert({name: 'Tony'});
};

exports.down = function(knex, Promise) {
  return knex('users').where({name: 'Tony'}).del();
};
