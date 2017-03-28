
exports.up = (knex, Promise) => {
  return knex('users').insert({name: 'Tony'});
};

exports.down = (knex, Promise) => {
  return knex('users').where({name: 'Tony'}).del();
};
