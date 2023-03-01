import { useState } from "react"
import './style.scss';

function MovieSearch({ handleOnChange, sortMovieHandler, moviesData }) {

    const [searchFilteredData, setSearchFilteredData] = useState([])

    const [sortToggleOption, setSortToggleOption] = useState({
        episode: true,
        year: false,
    })

    const [filterToggleOption, setFilteredToggleOption] = useState({
        episode: true,
        year: false
    })

    const onPressSortHandler = (option) => {
        if(option === "episode" && searchFilteredData.length > 0){
            sortEpisodeByOrder(filterToggleOption.episode, true);
            toggleOption(option, filterToggleOption[option])
        }else if(option === "episode" && searchFilteredData.length === 0){
            sortEpisodeByOrder(sortToggleOption.episode, false)
            toggleOption(option, sortToggleOption[option]);
        }else if(option === "year" && searchFilteredData.length > 0){
            sortYearByOrder(filterToggleOption.year, true)
            toggleOption(option, filterToggleOption[option])
        }else if(option === "year" && searchFilteredData.length === 0){
            sortYearByOrder(sortToggleOption.year, false)
            toggleOption(option, sortToggleOption[option]);
        }


      
    }

    const sortEpisodeByOrder = (toggle, isFilteredData) =>{
        let sortData;
        if(toggle && isFilteredData){
            sortData = [...searchFilteredData].sort((a,b) => a.episode_id - b.episode_id)
        }else if(!toggle && isFilteredData){
            sortData = [...searchFilteredData].sort((a, b) => b.episode_id - a.episode_id)
        }else if(toggle && !isFilteredData){
            sortData = [...moviesData].sort((a,b) => a.episode_id - b.episode_id)
        }else{
            sortData = [...moviesData].sort((a,b) => b.episode_id - a.episode_id)
        }
        sortMovieHandler(sortData, searchFilteredData.length)
    }


    const sortYearByOrder = (toggle, isFilteredData) =>{
        let sortData;
        if(toggle && isFilteredData){
            sortData = [...searchFilteredData].sort((a, b) => new Date(...a.release_date.split('/').reverse()) - new Date(...b.release_date.split('/').reverse()));
        }else if(!toggle && isFilteredData){
            sortData = [...searchFilteredData].sort((a, b) => new Date(...b.release_date.split('/').reverse()) - new Date(...a.release_date.split('/').reverse()));
        }else if(toggle && !isFilteredData){
            sortData = [...moviesData].sort((a, b) => new Date(...a.release_date.split('/').reverse()) - new Date(...b.release_date.split('/').reverse()));
        }else{
            sortData = [...moviesData].sort((a, b) => new Date(...b.release_date.split('/').reverse()) - new Date(...a.release_date.split('/').reverse()));
        }
        sortMovieHandler(sortData, searchFilteredData.length)
    }

    const toggleOption = (option, currentValue) => {
        if(searchFilteredData.length > 0){
            setFilteredToggleOption({
                [option]: !currentValue
            })
        }else{
            setSortToggleOption({
                [option]: !currentValue
            })
        }

    }

    const onChangeSearchHandler = (keyword) => {
        const searchResult = moviesData.filter(element => {
            return (element.title.toLowerCase()).includes(keyword.toLowerCase())
        })
        searchResult.length > 0 ? handleOnChange(searchResult) : handleOnChange([])
        setSearchFilteredData(searchResult)
        console.log("SETTING DATA", searchFilteredData)
        //handleOnChange(searchFilteredData)
    }
    return (
        <div className="search-sort-wrapper">
            <div className="sort-container">
                <button className="btn btn-light" onClick={() => { onPressSortHandler('episode') }}>Episode</button>
                <button className="btn btn-light" onClick={() => { onPressSortHandler('year') }}>Year</button>
            </div>
            <div className="w-100">
                <input className="form-control" placeholder="Type to Search..." onChange={(e) => onChangeSearchHandler(e.target.value)} />
            </div>
        </div>
    )
}

export default MovieSearch