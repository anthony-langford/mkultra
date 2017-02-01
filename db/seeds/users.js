exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('items').del(),
    knex('useritems').del(),
    ])
    .then(function () {
      return Promise.all([
        knex('items').insert({id: 1, name: 'Gladiator', category: 'Movie'}),
        knex('users').insert({id: 1, name: 'Alice'}),
        knex('useritems').insert({user_id: 1, item_id: 1, comment: 'Good movie'})
      ]);
    });
};


// exports.seed = function(knex, Promise) {
//   return Promise.all([
//     knex('items').del(),
//     knex('useritems').del(),
//   ])
//   .then(function () {
//     knex('items')
//       .insert({
//         id: 1,
//         name: 'Gladiator',
//         category: 'Movie'
//       })
//       .then((item) => {
//         return knex('useritems').insert({user_id: 1, item_id: item.id, comment: 'Good movie'});
//       })
//   })
//   .then()
//   .catch();
// };
