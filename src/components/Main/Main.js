import { useState, useEffect } from 'react'
import './main.scss'
import MovieContent from '../MovieContent/MovieContent';
import MovieSearch from '../MovieSearch/MovieSearch';

function Main() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [moviesData, setMoviesData] = useState({});
    const [selectedMovie, setSelectedMovie] = useState({});
    const [filterdMovie, setFilterdMovie] = useState([]);
    const handleOnMovieClick = (data) => {
        setSelectedMovie(data);
    }

    const handleOnChange = (filteredData) => {
        setFilterdMovie(filteredData);
    }

    const sortMovieHandler = (data, filteredDataLength) =>{
        if(filteredDataLength > 0){
            setFilterdMovie(data)
        }else{
            setMoviesData(data)
        }
    }   

    useEffect(() => {
        fetch("https://swapi.dev/api/films/?format=json")
            .then(response => response.json())
            .then((result) => {
                setIsLoaded(true);
                setMoviesData(result.results);
            },
                (error) => {
                    setIsLoaded(true);
                    console.log("Error Catch", error);
                }
            )
    }, [])

    if (!isLoaded) {
        return <div><h1>Loading.....</h1></div>
    }
    else {
        return (
            <div className="moviesMainWrapper">
                <div>
                    <MovieSearch  moviesData={moviesData} sortMovieHandler={sortMovieHandler} handleOnChange={handleOnChange} />
                </div>
                <div className="moviesRowWrapper">
                    <div className="movieTitleWrapper w-50">
                        {
                            filterdMovie.length > 0 ?
                                filterdMovie.map((element, index) => {
                                    return (
                                        <div className='d-flex align-items-center movie-name-wrapper' key={index} onClick={() => { handleOnMovieClick(element) }}>
                                            <span className='episode'>EPISODE {element.episode_id}&nbsp;</span>
                                            <div className='name-sub-wrapper'>
                                                <span className='title'>{element.title}</span>
                                                <span className='date'>{element.release_date}</span>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                moviesData.map((element, index) => {
                                    return (
                                        <div className='d-flex align-items-center movie-name-wrapper' key={index} onClick={() => { handleOnMovieClick(element) }}>
                                            <span className='episode'>EPISODE {element.episode_id}&nbsp;</span>
                                            <div className='name-sub-wrapper'>
                                                <span className='title'>{element.title}</span>
                                                <span className='date'>{element.release_date}</span>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="movieContentWrapper w-50">
                        <MovieContent movieContent={selectedMovie} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Main;