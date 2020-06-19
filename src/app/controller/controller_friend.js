const express = require('express');
const router = express.Router();
const { pool } = require('../../db/server');

const {
    getFriends,
    getFriendByID,
    getFriend,
    DeleteFriend,
    InsertFriend
} = require('../models/Friend');

router.get('/friends/:id_user', async (request, result) => {
    try {
        const id = request.params.id_user;
        const friend = await pool.query(getFriends, [id]);
        result.status(200).send(friend.rows)
    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/:id', async (request, result) => {
    try {
        const id = request.params.id;
        const verifyFriend = await pool.query(getFriendByID, [id]);

        if (verifyFriend.rowCount) 
            return result.status(200).send(verifyFriend.rows[0])
        
        return result.status(400).send('Erro, amigo não encontrado.');

    } catch (error) {
        console.log("error: " + error);
    }
});

router.get('/', async (request, result) => {
    try {
        const { name, id_user } = request.body;
        const verifyFriend = await pool.query(getFriend, [name, id_user]);

        if (verifyFriend.rowCount) 
            return result.status(200).send(verifyFriend.rows[0])
        
        return result.status(400).send('Erro, amigo não encontrado.');

    } catch (error) {
        console.log("error: " + error);
    }
});

router.post('/', async (request, result) => {
    try {
        const { name, best, id_user } = request.body;
        const verifyFriend = await pool.query(getFriend, [name, id_user]);

        if (verifyFriend.rowCount) {
            return result.status(400).send('Erro, amigo já cadastrado.');
        }

        else {
            await pool.query(InsertFriend, [name, best, id_user]);
            const newFriend = await pool.query(getFriend, [name, id_user]);
            return result.status(200).send({ friend: newFriend.rows });
        }

    } catch (error) {
        console.log("error: " + error);
    }
});

router.delete('/', async (request, result) => {
    try {
        const { name, id_user } = request.body
        const deleteFriend = await pool.query(DeleteFriend, [name, id_user]);

        if (!deleteFriend.rowCount)
            return result.status(400).send('Erro, amigo não existe em nosso sistema.');

        return result.status(200).send('Amigo deletado com sucesso.');

    } catch (error) {
        console.log(error);
    }
})


module.exports = app => app.use('/friend', router);