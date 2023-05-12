interface iMovies {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number
}
type iMoviesRequest = Omit<iMovies, 'id'>

export {iMovies, iMoviesRequest}