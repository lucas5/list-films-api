// Pega todos os filmes
const getUsers = 'SELECT * FROM api_filmes.tab_user'
const getUser = 'SELECT * FROM api_filmes.tab_user WHERE(username = $1 and email = $2)'
const getUserByID = 'SELECT * FROM api_filmes.tab_user WHERE(id = $1)'
const InsertUser = 'INSERT INTO api_filmes.tab_user VALUES(DEFAULT, $1, $2, $3)'
const DeleteUser = 'DELETE FROM api_filmes.tab_user WHERE(username = $1 and email = $2)'

module.exports = {
    getUsers,
    getUserByID,
    getUser,
    InsertUser,
    DeleteUser
}