const movies = [
  {
    id: 12,
    year: "",
    title: "Mission: Impossible - Dead Reckoning Part One",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNTdiYmVkM2YtM2RhMi00Nzc4LWE0ODQtNWE4OGQ5MDNiYWI0XkEyXkFqcGdeQXVyMTUzOTcyODA5._V1_SX300.jpg",
    genre: "Action, Adventure, Thriller",
  },
  {
    id: 14,
    year: "2023",
    title: "Oppenheimer",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDEzNDdjYTctNjA4ZS00ZDgzLTkxNmUtMTQwMzUyMmFhMWRhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    genre: "Biography, Drama, History",
  },

  {
    id: 11,
    year: "2023",
    title: "Insidious: The Red Door",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjdlZjI4YTEtNjgzZi00NTA1LWIwZWYtMDc0MzhjOWNlYjcxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    genre: "Horror, Mystery, Thriller",
  },
  {
    id: 7,
    year: "2023",
    title: "Indiana Jones",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDJhODYxYzItOGIwZC00ZTBiLTlmN2MtMjM2MzQyZDVkMGM4XkEyXkFqcGdeQXVyMTUzMDA3Mjc2._V1_SX300.jpg",
    genre: "Action, Adventure",
  },
  {
    id: 2,
    title: "Adipurush",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYTcyZjA0OTYtOTA4OC00M2UxLThkODUtYzNiMWI5NWRhMGM5XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
    genre: "Action, Adventure, Drama",
  },

  {
    id: 13,
    year: "2023",
    title: "The Flash",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZWE2ZWE5MDQtMTJlZi00MTVjLTkxOTgtNmNiYjg2NDIxN2NhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    genre: "Action, Adventure, Fantasy",
  },
  {
    id: 6,
    year: "",
    title: "Spider-Man: Across the Spider-Verse",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    genre: "Animation, Action, Adventure",
  },

  {
    id: 1,
    year: "",
    title: "Fast X",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    genre: "Action, Adventure, Crime",
  },

  {
    id: 4,
    year: "",
    title: "John Wick: Chapter 4",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    genre: "Action, Crime, Thriller",
  },
  {
    id: 3,
    year: "",
    title: "Guardians of the Galaxy Vol. 3",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    genre: "Action, Adventure, Comedy",
  },
  {
    id: 5,
    year: "",
    title: "Transformers: Rise of the Beasts",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZTNiNDA4NmMtNTExNi00YmViLWJkMDAtMDAxNmRjY2I2NDVjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    genre: "Action, Adventure, Sci-Fi",
  },
  {
    id: 8,
    year: "2022",
    title: "RRR",
    poster:
      "https://i.pinimg.com/originals/66/9c/93/669c93a42f553686a7698cebc5658055.jpg",
    genre: "Drama/Action",
  },
  // {
  //   id: 9,
  //   year: "",
  //   title: "The Matrix",
  //   poster:
  //     "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  //   genre: "Action, Sci-Fi",
  // },
  // {
  //   id: 10,
  //   year: "",
  //   title: "Pirates of silicon valley",
  //   poster:
  //     "https://m.media-amazon.com/images/M/MV5BNDc2NTE0NzE4N15BMl5BanBnXkFtZTgwMDQ5MzgwMzE@._V1_SX300.jpg",
  //   genre: "Biography, Drama, History",
  // },

  // {
  //   id: 15,
  //   year: "",
  //   title: "Pushpa: The Rise - Part 1",
  //   poster:
  //     "https://m.media-amazon.com/images/M/MV5BMmQ4YmM3NjgtNTExNC00ZTZhLWEwZTctYjdhOWI4ZWFlMDk2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
  //   genre: "Action, Crime, Drama",
  // },
  // {
  //   id: 16,

  //   title: "Pathaan",
  //   poster:
  //     "https://m.media-amazon.com/images/M/MV5BMThkZmNlMzQtZmU4Ny00YzhkLWE5YWYtOGJjNjRjODNjMzZkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  //   genre: "Action, Adventure, Thriller",
  // },
];

export default movies;
