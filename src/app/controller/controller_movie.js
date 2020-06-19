const express = require('express');
const router = express.Router();
const { pool } = require('../../db/server');

const {
    getMovies,
    getMovieByID,
    DeleteMovie,
    InsertMovie,
    getMovie,
    getMoviesByFriend,
    getMoviesWatched,
    getMoviesNotWatched
} = require('../models/Movie');

router.get('/movies/:id_user', async (request, result) => {
    try {
        const id = request.params.id_user;
        const movie = await pool.query(getMovies, [id]);
        result.status(200).send(movie.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/user/:id_user/indicated/:id_friend', async (request, result) => {
    try {
        const id_user = request.params.id_user;
        const id_friend = request.params.id_friend;
        const movie = await pool.query(getMoviesByFriend, [id_user, id_friend]);
        result.status(200).send(movie.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/watched/:id_user', async (request, result) => {
    try {
        const id = request.params.id_user;
        const movie = await pool.query(getMoviesWatched, [id]);
        result.status(200).send(movie.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/notwatched/:id_user', async (request, result) => {
    try {
        const id = request.params.id_user;
        const movie = await pool.query(getMoviesNotWatched, [id]);
        result.status(200).send(movie.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});


router.get('/:id', async (request, result) => {
    try {
        const id = request.params.id;
        const verifyMovie = await pool.query(getMovieByID, [id]);

        if (verifyMovie.rowCount) 
            return result.status(200).send(verifyMovie.rows[0])
        
        return result.status(400).send('Erro, filme não encontrado.');

    } catch (error) {
        console.log("error: " + error);
    }
});

router.post('/', async (request, result) => {
    try {
        const { name, url, comment, watched, twatched, avaliation, id_user, id_friend } = request.body;
        const verifyMovie = await pool.query(getMovie, [name, id_user, id_friend]);

        var nm = name.split(" ").join("_");

        if (verifyMovie.rowCount) {
            return result.status(400).send('Erro, filme já cadastrado.');
        }

        else {
            await pool.query(InsertMovie, [nm, url, comment, watched, twatched, avaliation, id_user, id_friend]);
            const newMovie = await pool.query(getMovie, [nm, id_user, id_friend]);
            return result.status(200).send({ movie: newMovie.rows });
        }

    } catch (error) {
        console.log("error: " + error);
    }
});

router.delete('/:id', async (request, result) => {
    try {
        const id  = request.params.id
        const deleteMovie = await pool.query(DeleteMovie, [id]);

        if (!deleteMovie.rowCount)
            return result.status(400).send('Erro, filme não existe em nosso sistema.');

        return result.status(200).send('Filme deletado com sucesso.');

    } catch (error) {
        console.log(error);
    }
})


module.exports = app => app.use('/movie', router);