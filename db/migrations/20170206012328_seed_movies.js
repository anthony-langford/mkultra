
exports.up = (knex, Promise) => {
  let date = new Date();
  return Promise.all([
    knex('movies').insert({
      title: 'Gladiator',
      year: 2000,
      rating: 8.5,
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwMzQzNTQ1Ml5BMl5BanBnXkFtZTgwMDY2NTYxMTE@._V1_SX300.jpg',
      genres: [ 'Action', 'Adventure', 'Drama' ],
      rated: 'R',
      director: 'Ridley Scott',
      runtime: 155,
      plot: 'When a Roman general is betrayed and his family murdered by an emperor\'s corrupt son, he comes to Rome as a gladiator to seek revenge.',
      date: date.getTime(),
    })
  ]);
};

exports.down = (knex, Promise) => {
  return knex('movies').where({name: 'Gladiator'}).del();
};
