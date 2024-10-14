const movies = [
  {
    id: 1,
    title: 'Deadpool & Wolverine',
    showtimes: [
      { time: '18:00', theater: 1 }, // เปลี่ยน 'Theater 1' เป็น 1
      { time: '16:00', theater: 2 }, // เปลี่ยน 'Theater 2' เป็น 2
    ],
    price: 200,
    poster: 'https://lh3.googleusercontent.com/RfW1VZJ8tzBL1lK9kHqspxIBLQejmYZVgMQIXgrCL-SpUz3jx5jUvnh9YtgQT1Kpoq7I_pSyvUW85_Q-NCF8o94CBOgU3BtGTA=s0?fbclid=IwY2xjawF0vZ5leHRuA2FlbQIxMAABHRoY5eqmE8NwpIXY1PJebFNdBkBNTK_q9OYP9X_hmtXrbqk-a8JRPOkdFg_aem_aVNVr_xehriw5Yv9Piwk8w',
    ratings: {
      imdb: 7.8,
      rottenTomatoes: 78,
      metacritic: 8.1,
    },
    genre: 'Action Comedy Sci-Fi Superheroes',
  },
  {
    id: 2,
    title: 'พี่มาก..พระโขนง Pee Mak',
    showtimes: [
      { time: '14:30', theater: 1 },
      { time: '13:00', theater: 2 },
    ],
    price: 250,
    poster: 'https://cdni-cf.ch7.com/dm/sz-sm/i/mg/e/5/c/e5cac0739cdb3a34264635a9f8f99bea_51peemak.jpg',
    ratings: {
      imdb: 7.2,
      rottenTomatoes: 76,
      metacritic: null,
    },
    genre: 'Horror Comedy',
  },
  {
    id: 3,
    title: 'Harry Potter and the Deathly Hallows',
    showtimes: [
      { time: '21:00', theater: 1 },
      { time: '20:45', theater: 2 },
    ],
    price: 220,
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM5B_6zp8uHGWppuJCawVuvN9KNSv3NqkoKw&s&fbclid=IwY2xjawF0vsVleHRuA2FlbQIxMAABHfc15N2dckX9tzUr5Oh2G8mCCzRPaJ7ee51qqczacqfLU_kCo_CHgpCG-g_aem_R9NKqqaMrL5usUAEIM6b-Q',
    ratings: {
      imdb: 7.7,
      rottenTomatoes: 77,
      metacritic: 6.5,
    },
    genre: 'Adventure Family Fantasy',
  },
  {
    id: 4,
    title: 'Jurassic World',
    showtimes: [
      { time: '18:30', theater: 1 },
      { time: '20:30', theater: 2 },
    ],
    price: 240,
    poster: 'https://www.francetvinfo.fr/pictures/ZI_qW8rj-M3FSK7NSsvoxY0r-Ow/fit-in/720x/2019/04/11/jurassic_c.jpg',
    ratings: {
      imdb: 7.0,
      rottenTomatoes: 60,
      metacritic: 6.5,
    },
    genre: 'Adventure',
  },
  {
    id: 5,
    title: 'Frozen II',
    showtimes: [
      { time: '10:00', theater: 1 },
      { time: '13:00', theater: 2 },
    ],
    price: 200,
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyvR0dM2P-zTwdnnr7Ojkzdl3qLMx3XgZvyuPSt5DBAPk5ZsKIYHEjeXfmNhvCQhEN_w&usqp=CAU',
    ratings: {
      imdb: 7.1,
      rottenTomatoes: 74,
      metacritic: 6.8,
    },
    genre: 'Animation',
  },
  {
    id: 6,
    title: 'Fast & Furious 9',
    showtimes: [
      { time: '22:30', theater: 1 },
      { time: '00:00', theater: 2 },
    ],
    price: 300,
    poster: 'https://m.media-amazon.com/images/M/MV5BODJkMTQ5ZmQtNzQxYy00ZWNlLWI0ZGYtYjU1NzdiMjcyNDRmXkEyXkFqcGc@._V1_.jpg',
    ratings: {
      imdb: 5.2,
      rottenTomatoes: 59,
      metacritic: 6.2,
    },
    genre: 'Action',
  },
];

export default movies;
