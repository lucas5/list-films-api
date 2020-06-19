const express = require('express');
const router = express.Router();
const { pool } = require('../../db/server');

const {
    getUsers,
    getUserByID,
    getUser,
    DeleteUser,
    InsertUser
} = require('../models/User');

router.get('/users', async (request, result) => {
    try {
        const user = await pool.query(getUsers);
        result.status(200).send(user.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/:id', async (request, result) => {
    try {
        const id = request.params.id;
        const verifyUser = await pool.query(getUserByID, [id]);

        if (verifyUser.rowCount) 
            return result.status(200).send(verifyUser.rows[0])
        
        return result.status(400).send('Erro, usuário não encontrado.');

    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/:username/:email', async (request, result) => {
    try {
        const email = request.params.email;
        const username = request.params.username;
        const verifyUser = await pool.query(getUser, [username, email]);

        if (verifyUser.rowCount) 
            return result.status(200).send(verifyUser.rows[0]);
        
        return result.status(400).send('Erro, usuário não encontrado.');
        
    } catch (error) {
        console.log("error: " + error);
    }
});

router.post('/', async (request, result) => {
    try {
        const { username, email, password } = request.body;
        const verifyUser = await pool.query(getUser, [username, email]);

        if (verifyUser.rowCount) {
            return result.status(400).send('Erro, usuário já em nosso sistema.');
        }

        else {
            await pool.query(InsertUser, [username, email, password]);
            const newUser = await pool.query(getUser, [username, email]);
            return result.status(200).send({ user: newUser.rows });
        }

    } catch (error) {
        console.log("error: " + error);
    }
});

router.delete('/', async (request, result) => {
    try {
        const { username, email } = request.body
        const deleteUser = await pool.query(DeleteUser, [username, email]);

        if (!deleteUser.rowCount)
            return result.status(400).send('Erro, usuário não existe em nosso sistema.');

        return result.status(200).send('Usuário deletado com sucesso.');

    } catch (error) {
        console.log(error);
    }
})


module.exports = app => app.use('/user', router);