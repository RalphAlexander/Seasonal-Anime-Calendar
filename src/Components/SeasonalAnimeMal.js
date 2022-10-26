
// @param anime - objects to be displayed / rendered
// @param handleAddAnimeToList - function that adds anime to the user's list, does
// not add duplicates
//
// Renders a list of anime
export default function SeasonalAnimeMal({
    anime,
    handleAddAnimeToList
}) {
    return (
        <>
            <div className='anime-card'>
                <div className='anime-card-title-wrapper'>
                    <div className='anime-card-title'>
                        {anime.title}
                    </div>
                </div>
                <div className='anime-card-button-wrapper'>
                    <button
                        className='anime-card-button'
                        onClick={() => {handleAddAnimeToList(anime)}}>
                        add to list
                    </button>
                </div>
                <div className='anime-card-img-wrapper'>
                    <img
                        src={anime.images.jpg.image_url}
                        className='anime-card-img' />
                </div>
                <div className='anime-card-synopsis-wrapper'>
                    <div className="anime-card-synopsis">
                        {anime.synopsis}
                    </div>
                </div>
            </div>
        </>
    )
}
