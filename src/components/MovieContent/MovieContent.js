import './movieContent.scss'

function MovieContent({movieContent}){
    
    
    if(Object.keys(movieContent).length === 0){
        return <div className="no-movie-selected"><p>No Movie Selected</p></div>
    }else{
        return(
            <div className='movie-details-wrapper'>
                <h3>Episode {movieContent.episode_id} &nbsp; {movieContent.title}</h3>
                <p>{movieContent.opening_crawl}</p>
                <div className='director-name'>Directed By: {movieContent.director}</div>
            </div>
        )
    }
    
}   

export default MovieContent