import Vue from 'vue';
import axios from 'axios';

const app2 = new Vue({
    el: '#app2', 
    data: {
        // Cards
        movies: [], 
        searchInput: '',
        availableFlags: ['it', 'en'],
        // Filter
        movieGenres: [], 
        actualMoviegenre: 'all'
    }, 
    created() {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=74679bd993cf34103a0c431e9718254e&language=en-EN')
            .then(result => {
                // handle success
                // console.log(result.data.results);
                this.movies = result.data.results;
            })

            .catch(error => {
                // handle error
                console.log(error);
            })
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=74679bd993cf34103a0c431e9718254e&language=en-EN')
            .then(result => {
                // handle success
                // console.log(result.data.results);
                this.movieGenres = result.data.genres;
            })

            .catch(error => {
                // handle error
                console.log(error);
            })
    }, 
    methods: {
        lookFor() {
            axios.get('https://api.themoviedb.org/3/search/movie' , {
                    params: {
                        api_key: '74679bd993cf34103a0c431e9718254e',
                        query: this.searchInput,
                        language: 'en-EN'
                    }
                })
                .then(result => {
                    // handle success
                    // console.log(result.data.results);
                    this.movies = result.data.results;
                })

                .catch(error => {
                    // handle error
                    console.log(error);
                })
        },
        isLangFlag(lang){
            // if flag exist, give me back the value 
            return this.availableFlags.includes(lang)
        },
        getFlag(lang) {
            return `./images/${lang}.png`
        },
        getRating(vote) {
            return Math.ceil(vote / 2);
        }, 
        getPoster(poster) {
            return `https://image.tmdb.org/t/p/w342${poster}`;
        },
        // filter
        filterGenreMovie(){
            // console.log('filterchanged');

            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=74679bd993cf34103a0c431e9718254e&language=en-EN')
                .then(result => {
                    // handle success
                    // make a copy
                    let movieList = result.data.results;

                    console.log('log' + this.actualMoviegenre);

                    /* ***************************************************************
                    * filtering results in the new list, based on actualMovieGenre value (value != '1')
                    *************************************************************** */
                    if(this.actualMoviegenre !== 'all') {
                        movieList = movieList.filter( element => element.genre_ids.includes(this.actualMoviegenre))

                            this.movies = movieList;
                            // console.log(movieList);
                    }
                    else {
                        this.movies = movieList;
                        // console.log(movieList);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }       
    }
});