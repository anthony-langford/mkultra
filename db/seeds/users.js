exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('movies').del()
    ])
    .then(() => {
      return Promise.all([
        knex('users').insert({ id: 1, name: 'Alice', email: 'example@eg.com', password: '' }),
        knex('movies').insert({
          title: 'Gladiator',
          year: 2000,
          rating: 8.5,
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwMzQzNTQ1Ml5BMl5BanBnXkFtZTgwMDY2NTYxMTE@._V1_SX300.jpg',
          genres: 'Action, Adventure, Drama',
          rated: 'R',
          director: 'Ridley Scott',
          runtime: 155,
          plot: "When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.",
          date: 1486344897303
        })
      ]);
    })
};
