const express = require('express');
const app = express();

const Joi = require('joi');

app.use(express.json());

const games = [{
    id: 1,
    title: 'Mario'
},
{
    id: 2,
    title: 'Zelda'
},
{
    id: 3,
    title: 'Donkey Kong'
}
];


 
app.get('/', (req, res) => {
    res.send('Welcome Page');
});

//get all games
app.get('/api/games', (req, res) => {
    res.send(games);
});

// get by id
app.get('/api/games/:id', (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('The game with the given ID was not found.');
    res.send(game);
});
 
// adding a new game
app.post('/api/games', (req, res) => {
    const schema = {
        title: Joi.string().min(2).required()
    };
 
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error)
    }

    const game = {
        id: games.length + 1,
        title: req.body.title
    }
    games.push(game);
    res.send(game);
});

// update a game
app.put('/api/games/:id', (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('The game with the given ID was not found.');
 
    const schema = {
        title: Joi.string().min(2).required()
    };
 
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error)
    }
 
    game.title = req.body.title;
    res.send(game);
});

// delete a game
app.delete('/api/games/:id', (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('The game with the given ID was not found.');
 
    const index = games.indexOf(game);
    games.splice(index, 1);
 
    res.send(game);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));