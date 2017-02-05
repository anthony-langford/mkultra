exports.seed = function(knex, Promise) {
  return Promise.all([])
    .then(function () {
      return Promise.all([
        knex('items').insert({id: 1, name: 'Gladiator', category: 'Movie'}),
        knex('users').insert({id: 1, name: 'Alice'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('useritems').insert({user_id: 1, item_id: 1, comment: 'Good movie'})
      ]);
  });
};
