import SeasonalAnimeMal from "./SeasonalAnimeMal"
import SeasonalAnimeRow from "./SeasonalAnimeRow"

// @param handleAddAnimeToList - function that adds anime to the user's list, does
// not add duplicates
// @param seasonalList - array of objects anime obtained from fetch request
// @param displayType - the name of layout / display in a string
//
// changes the view / layout of the Seasonal Anime
export default function SeasonalAnimeViewType({
    handleAddAnimeToList,
    seasonalList,
    displayType

}) {
    return (
        <>
            <div className='seasonal-view-body'>
                <h1>
                    Seasonal Anime
                </h1>
                <div className='card-container'>
                    {displayType === 'MALStyle' &&
                        seasonalList.map((seasonalAnime) => {
                            return (
                                <SeasonalAnimeMal
                                    anime={seasonalAnime}
                                    key={seasonalAnime.mal_id}
                                    handleAddAnimeToList={handleAddAnimeToList}
                                />
                            )
                        })}
                    {displayType === 'RowDisplay' &&
                        seasonalList.map((seasonalAnime) => {
                            return (
                                <SeasonalAnimeRow
                                    anime={seasonalAnime}
                                    key={seasonalAnime.mal_id}
                                    handleAddAnimeToList={handleAddAnimeToList}
                                />
                            )
                        })}
                </div>
            </div>
        </>
    )
}