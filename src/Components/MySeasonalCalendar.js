import MySeasonalCalendarEntry from "./MySeasonalCalendarEntry"

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
