import SeasonalCalendarEntry from "./SeasonalCalendarEntry"

export default function MySeasonalCalendar({
    handleDisplayWithinTime,
    handleDateSortFromNow,
    getDaysAndHoursUntilNextEpisode,
    filterTime,
    userList
}) {
    return (
        <>
            {/* <SortByDate /> */}
            <h1>
                Seasonal Calendar
            </h1>
            <div>
                <button onClick={() => { handleDisplayWithinTime(24) }}> 24h </button>
                <button onClick={() => { handleDisplayWithinTime(48) }}> 48h </button>
                <button onClick={() => { handleDisplayWithinTime(72) }}> 72h </button>
                <button onClick={() => { handleDisplayWithinTime(96) }}> 96h </button>
                <button onClick={() => { handleDisplayWithinTime(120) }}> 120h </button>
            </div>
            <div>
                <button onClick={handleDateSortFromNow}> Sort By Time </button>
            </div>
            <div>
                <h3>
                    Upcoming in the next {filterTime} hours:
                </h3>
                <div className='seasonal-calendar-grid'>
                    {userList && userList.map((anime) => {
                        return (
                            <SeasonalCalendarEntry
                                anime={anime}
                                key={anime.mal_id}
                                filterTime={filterTime}
                                getDaysAndHoursUntilNextEpisode={getDaysAndHoursUntilNextEpisode}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
