// Pega todos os filmes
const getFriends = 'SELECT * FROM api_filmes.tab_friend WHERE(id_user = $1)'
const getFriendByID = 'SELECT * FROM api_filmes.tab_friend WHERE(id = $1)'
const getFriend = 'SELECT * FROM api_filmes.tab_friend WHERE(name = $1 and id_user = $2)'
const InsertFriend = 'INSERT INTO api_filmes.tab_friend VALUES(DEFAULT, $1, $2, $3)'
const DeleteFriend = 'DELETE FROM api_filmes.tab_friend WHERE(name = $1 and id_user = $2)'

module.exports = {
    getFriends,
    getFriendByID,
    getFriend,
    InsertFriend,
    DeleteFriend
}