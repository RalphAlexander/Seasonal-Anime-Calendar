// @param anime - object to be rendered
// @param getDaysAndHoursUntilNextEpisode - function that returns an object with the number
// of days and hours until the next episode airs
// @param - function that returns the date of the anime object in the user's local time
// @param filterTime - a filter of int type
//
// Renders a formatted anime object displayed with the object's information and time until
// it airs. Anime with a null broadcast time is not displayed
export default function MySeasonalCalendarEntry({
    anime,
    getDaysAndHoursUntilNextEpisode,
    getAnimeBroadcastTime,
    filterTime
}) {

    if (anime.broadcast.time) {
        const diffInDaysAndHours = getDaysAndHoursUntilNextEpisode(anime)
        const daysUntilNextEpisode = diffInDaysAndHours.days
        const hoursUntilNextEpisode = Math.round(diffInDaysAndHours.hours)
        const totalHoursUntilNextEpisode = (daysUntilNextEpisode * 24) + hoursUntilNextEpisode

        var diffDays, diffHours
        var isAiringSoon = false

        if (hoursUntilNextEpisode !== 0) {
            if (daysUntilNextEpisode === 0) diffDays = ''
            else if (daysUntilNextEpisode === 1) {
                diffDays = String(daysUntilNextEpisode) + ' day and '
            } else {
                diffDays = String(daysUntilNextEpisode) + ' days and '
            }
        }
        else {
            if (daysUntilNextEpisode === 0) diffDays = ''
            else if (daysUntilNextEpisode === 1) {
                diffDays = String(daysUntilNextEpisode) + ' day left and '
            } else {
                diffDays = String(daysUntilNextEpisode) + ' days left and '
            }
        }

        if (hoursUntilNextEpisode === 0) diffHours = ''
        else if (hoursUntilNextEpisode === 1) {
            diffHours = String(hoursUntilNextEpisode) + ' hour left'
        } else {
            diffHours = String(hoursUntilNextEpisode) + ' hours left'
        }

        if (daysUntilNextEpisode === 0 && hoursUntilNextEpisode === 0) {
            isAiringSoon = true
        }

        var date = getAnimeBroadcastTime(anime)


        var hour
        var minute
        if (date.hour < 10) {
            hour = '0' + date.c.hour
        } else hour = date.hour
        if (date.minute === 0) {
            minute = '00'
        } else minute = date.minute

        // Only returns if the condition that the next episode is within a certain amount of
        // hours (filterTime)
        if (totalHoursUntilNextEpisode < filterTime) {
            return (
                <>
                    <div className='seasonal-calendar-card'>
                        <div className='seasonal-calendar-anime-title-wrapper'>
                            <div className='seasonal-calendar-anime-title'>
                                {anime.title}
                            </div>
                        </div>
                        <div className='seasonal-calendar-anime-img-wrapper'>
                            <img
                                src={anime.images.jpg.image_url}
                                className='seasonal-calendar-anime-img' />
                        </div>
                        <div className='seasonal-calendar-anime-air-time'>
                            {`${date.weekdayLong}, ${hour}:${minute}`}
                        </div>
                        <div className='seasonal-calendar-anime-time-left-wrapper'>
                            <div className='seasonal-calendar-anime-time-left'>
                                Approximately: {isAiringSoon ? 'Less than 1 hour' :
                                    ` ${diffDays} ${diffHours}`}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}
