// @param anime - objects to be displayed / rendered
// @param handleAddAnimeToList - function that adds anime to the user's list, does
// not add duplicates
//
// Renders a list of anime
export default function SeasonalRow({
    anime,
    handleAddAnimeToList
}) {

    return (
        <>
            <div className='anime-card-row'>
                <div className='anime-card-row-img-wrapper'>
                    <img
                        src={anime.images.jpg.image_url}
                        className='anime-card-row-img' />
                    <div className='anime-card-row-background' />

                </div>
                <div className='anime-card-row-title'>
                    {anime.title}
                </div>
                <div className='anime-card-row-button-wrapper'>
                    <button
                        className='anime-card-button'
                        onClick={() => { handleAddAnimeToList(anime) }}>
                        Add to List
                    </button>
                </div>
            </div>
        </>
    )
}
