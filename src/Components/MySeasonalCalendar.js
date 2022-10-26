import MySeasonalCalendarEntry from "./MySeasonalCalendarEntry"

// @param getDaysAndHoursUntilNextEpisode - function that returns an object with the number
// of days and hours until the next episode airs
// @param getAnimeBroadcastTime - function that returns the date of the anime
// object in the user's local time
// @param filterTime - a filter of int type
// @param userList - array of anime objects
//
// Returns each individual card with the anime object's airing time information
export default function MySeasonalCalendar({
    getDaysAndHoursUntilNextEpisode,
    getAnimeBroadcastTime,
    filterTime,
    userList
}) {
    return (
        <div className='seasonal-calendar-grid-container'>
            <h1>
                Seasonal Calendar
            </h1>
            <div>
                <h2>
                    Upcoming in the next {filterTime} hours:
                </h2>
                <div className='seasonal-calendar-grid'>
                    {userList && userList.map((anime) => {
                        return (
                            <MySeasonalCalendarEntry
                                anime={anime}
                                key={anime.mal_id}
                                filterTime={filterTime}
                                getDaysAndHoursUntilNextEpisode={getDaysAndHoursUntilNextEpisode}
                                getAnimeBroadcastTime={getAnimeBroadcastTime}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
