var express = require('express');
var router = express.Router();
var request = require('request');

var movie = [
  {
    Title: 'Frozen',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'
  },
  {
    Title: 'Doctor Strange',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg'
  },
  {
    Title: 'Doctor Dolittle',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxOTM3NzU4M15BMl5BanBnXkFtZTgwNDU0MDUxMDE@._V1_SX300.jpg'
  },
  {
    Title: 'Shaun the Sheep',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU2MTcyNTY5Ml5BMl5BanBnXkFtZTgwODM1Mzc1NjE@._V1._CR108,0,293,336_SY132_CR13,0,89,132_AL_.jpg_V1_SX300.jpg'
  },
  {
    Title: 'The Wrong Trousers',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDBmNGU4MTEtMmI2Mi00NjU1LTgxNTktMDQ1MDE0Y2MwMjYwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
  },
  {
    Title: 'The Curse of the Were-Rabbit',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk1NzIwNTM1NV5BMl5BanBnXkFtZTcwMDA1NzkyMw@@._V1_SX300.jpg'
  },
  {
    Title: 'A Matter of Loaf and Death',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDg1Mzg1ZjEtM2JmZS00Y2QxLTkwOTYtYjQ4NjhlMzgwYzFjXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
  },
  {
    Title: 'The Nightmare Before Christmas',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNWE4OTNiM2ItMjY4Ni00ZTViLWFiZmEtZGEyNGY2ZmNlMzIyXkEyXkFqcGdeQXVyMDU5NDcxNw@@._V1_SX300.jpg'
  },
  {
    Title: 'Coraline',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxNjM5NzkxNV5BMl5BanBnXkFtZTcwMzg5NDMwMg@@._V1_SX300.jpg'
  },
  {
    Title: 'Mulan',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BODkxNGQ1NWYtNzg0Ny00Yjg3LThmZTItMjE2YjhmZTQ0ODY5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    Title: 'Pocahontas',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzc4YzhiN2ItY2Y4NC00YTA0LWEyMjEtNzllNTcxZDdjODhiXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg'
  },
  {
    Title: 'Moana',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_SX300.jpg'
  },
  {
    Title: 'Sleeping Beauty',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTJmZjA3MjMtMWNmZS00YTliLWFhMWUtZDU2NGJhNTlmY2ZkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    Title: 'Snow White and the Seven Dwarfs',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMzE2Mzc4M15BMl5BanBnXkFtZTcwMTE4NTc1Nw@@._V1_SX300.jpg'
  },
  {
    Title: 'Brave',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_SX300.jpg'
  },
  {
    Title: 'Tangled',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_SX300.jpg'
  },
  {
    Title: 'Cinderella',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxODYyODEzN15BMl5BanBnXkFtZTgwMDk4OTU0MzE@._V1_SX300.jpg'
  },
  {
    Title: 'The Princess and the Frog',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTQ5NzAzNl5BMl5BanBnXkFtZTcwMTcyNTU1Mg@@._V1_SX300.jpg'
  },
  {
    Title: 'Aladdin',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NDI1MjUtM2Q5ZS00MTFlLWJiYWEtNTZmNjQ3OGJkZDgxXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg'
  },
  {
    Title: 'The Little Mermaid',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYWVjZWRiYTItZmE4OS00MjY3LTlkYTEtNGQ2NzBjMjY0ODhlXkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg'
  },
  {
    Title: 'Beauty and the Beast',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzE5MDM1NDktY2I0OC00YWI5LTk2NzUtYjczNDczOWQxYjM0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    Title: 'Beauty and the Beast',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwNjUxMTM4NV5BMl5BanBnXkFtZTgwODExMDQzMTI@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode IV - A New Hope',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTUwNTdiMzMtNThmNS00ODUzLThlMDMtMTM5Y2JkNWJjOGQ2XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode V - The Empire Strikes Back',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode VI - Return of the Jedi',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode VII - The Force Awakens: The Story Awakens - The Table Read',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzk4ZTNjMjUtOGE3OS00Y2FlLWE5NjAtYjZmM2ExMzY2YzVlXkEyXkFqcGdeQXVyNzMxMzYyOTI@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode I - The Phantom Menace',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode II - Attack of the Clones',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOWNkZmVjODAtNTFlYy00NTQwLWJhY2UtMmFmZTkyOWJmZjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: Episode III - Revenge of the Sith',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg'
  },
  {
    Title: 'Star Wars: The Clone Wars',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI1MDIwMTczOV5BMl5BanBnXkFtZTcwNTI4MDE3MQ@@._V1_SX300.jpg'
  },
  {
    Title: 'Murder She Wrote',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkwMjg2NzczNV5BMl5BanBnXkFtZTcwNzg5ODcyMQ@@._V1_SX300.jpg'
  },
  {
    Title: 'VeggieTales',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIwODEwODM3MV5BMl5BanBnXkFtZTcwMDEwODAyMw@@._V1_SX300.jpg'
  },
  {
    Title: 'VeggieTales Jonah Sing-along Songs and More',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTRiZjg0NWQtZmM5Yy00MzZhLWI1ZmItZDllYmMxZmFiMTk0XkEyXkFqcGdeQXVyNzk5OTM4MA@@._V1_SX300.jpg'
  },
  {
    Title: 'Indiana Jones and the Last Crusade',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
  },
  {
    Title: 'Raiders of the Lost Ark',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_SX300.jpg'
  },
  {
    Title: 'Indiana Jones and the Temple of Doom',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMyNzI4OTA5OV5BMl5BanBnXkFtZTcwMDQ2MjAxNA@@._V1_SX300.jpg'
  },
  {
    Title: 'Planet Earth',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNmZlYzIzMTItY2EzYS00YTEyLTg0ZjEtMDMzZjM3ODdhN2UzXkEyXkFqcGdeQXVyNjI0MDg2NzE@._V1_SX300.jpg'
  },
  {
    Title: 'Really Wild Animals',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTk2YTllOTMtYjhlMC00NjViLTk2NzUtNThhZmViZTRkMzlhXkEyXkFqcGdeQXVyMjYxMzY2NDk@._V1_SX300.jpg'
  },
  {
    Title: 'The Gods Must Be Crazy',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2ODYxNzM3N15BMl5BanBnXkFtZTcwNDMwODUyMQ@@._V1_SX300.jpg'
  },
  {
    Title: 'The Gods Must Be Crazy II',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYzg5OTczM2QtNjgxOC00NjZkLTllZDAtMjViYjJjNzE3NDJmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
  },
  {
    Title: 'The Ewok Adventure',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNGExMWQ0MTAtNjk3Yi00YTJkLThkZGMtNjA0NDk1ZGUxMjVlXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_SX300.jpg'
  },
  {
    Title: 'The Man from Snowy River',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNGMxZTA5YTgtMzU1NS00YjNiLTkzMmQtNGEyNzRhNTViNmExL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
  },
  {
    Title: 'The Little Rascals',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYWE1MzdmNmMtNWQwZS00MTVkLTk3MDMtYzVkOWZlOTczMDIwXkEyXkFqcGdeQXVyNjg4NzYzMzA@._V1_SX300.jpg'
  },
  {
    Title: 'The Lion King',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg'
  },
  {
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg'
  },
  {
    Title: 'The Lord of the Rings: The Two Towers',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDY0NmI4ZjctN2VhZS00YzExLTkyZGItMTJhOTU5NTg4MDU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    Title: 'The Return of the King',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxNzUxNjExNV5BMl5BanBnXkFtZTcwNTcwMjgxMQ@@._V1_SX300.jpg'
  },
  {
    Title: 'Megamind',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzMzI0NTMzNDBeQTJeQWpwZ15BbWU3MDM3NTAyOTM@._V1_SX300.jpg'
  },
  {
    Title: 'The Prince of Egypt',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOWNjMjgyNmMtNWMzZC00YjI4LWI1NmUtMTY0ZTA0ZDQ4Y2EwXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg'
  },
  {
    Title: 'How to Train Your Dragon',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX300.jpg'
  }
];

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/movie', function(req, res) {
  console.log("In Movies");
  res.send(pokemon);
});

var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
router.get('/politics', function(req,res) {
  console.log("In politics");
  request(politics).pipe(res);
});

router.post('/movie', function(req, res) {
    console.log("In Movie Post");
    console.log(req.body);
    pokemon.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
