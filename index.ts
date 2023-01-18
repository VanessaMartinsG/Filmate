import api from './services/api'

export const movieService = {
    async getGenrerList() {
        try {
            const response = await api.get('/genre/movie/list')
            return response
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async getListMovies() {
        try {
            const response = await api.get('/discover/movie')
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }
}