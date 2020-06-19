// Pega todos os filmes
const getMovies = 'SELECT * FROM api_filmes.tab_movie WHERE(id_user = $1)'
const getMovieByID = 'SELECT * FROM api_filmes.tab_movie WHERE(id = $1)'
const getMovie = 'SELECT * FROM api_filmes.tab_movie WHERE(name = $1 and id_user = $2 and id_friend = $3)'
const InsertMovie = 'INSERT INTO api_filmes.tab_movie VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)'
const DeleteMovie = 'DELETE FROM api_filmes.tab_movie WHERE(id = $1)'

const getMoviesByFriend = 'SELECT * FROM api_filmes.tab_movie WHERE(id_user = $1 and id_friend = $2)'
const getMoviesWatched = 'SELECT * FROM api_filmes.tab_movie WHERE(id_user = $1 and watched = true)'
const getMoviesNotWatched = 'SELECT * FROM api_filmes.tab_movie WHERE(id_user = $1 and watched = false)'


module.exports = {
    getMovies,
    getMovieByID,
    getMovie,
    InsertMovie,
    DeleteMovie,
    getMoviesByFriend,
    getMoviesWatched,
    getMoviesNotWatched
}