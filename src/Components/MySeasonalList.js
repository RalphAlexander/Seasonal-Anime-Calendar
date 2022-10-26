import { BiSortAlt2, BiSortAZ, BiSortZA, BiSortUp, BiSortDown, BiTrash } from 'react-icons/bi'

import MySeasonalEntry from './MySeasonalEntry'

// @param handleTitleSort - function that sorts and update the state of the userList array in order of the object's 
// title in ascending or descending order depending on the boolean state titleIsSortedInAscending
// @param handleCheckBox - Function that sets the property checked of the anime object to its opposite boolean value
// @param handleDateSortMondaytoSunday - Function that sorts and update the state of the userList 
// array in order of the object's air time from monday to sunday in ascending or descending order
// depending on the boolean state dateIsSortedInAscending
// @param handleOpenDeleteWindow - Function that sets the state of delete view to its opposite
// @param handleIncreaseEpisodeCounter - Function that increases the current count of the property episode of the anime object
// @param handleDecreaseEpisodeCounter - Function that decreases the current count of the property episode of the anime object
// @param getAnimeAirDate - Function that returns the air date of the anime object
// @param getAnimeBroadcastTime - Function that returns the date of the anime object in the user's local time
// @param titleIsSortedInAscending - boolean value of if userList is sorted in ascending order by date
// @param dateIsSortedInAscending - boolean value of if userList is sorted in ascending order by title
// @param userList - array of anime objects
//
// Returns the user's seasonal list
export default function MySeasonalList({
    handleTitleSort,
    handleCheckBox,
    handleDateSortMondaytoSunday,
    handleOpenDeleteWindow,
    handleIncreaseEpisodeCounter,
    handleDecreaseEpisodeCounter,
    getAnimeAirDate,
    getAnimeBroadcastTime,
    titleIsSortedInAscending,
    dateIsSortedInAscending,
    userList,
}) {
    return (
        <div className='bottom-margin'>
            <h1>
                My Seasonal List
            </h1>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <BiTrash
                                    className='icon-wrapper trash-icon'
                                    onClick={handleOpenDeleteWindow} />
                            </th>
                            <th> Image </th>
                            <th onClick={handleTitleSort}>
                                <div className='icon-wrapper'>
                                    Name
                                    {titleIsSortedInAscending === '' && <BiSortAlt2
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                    {titleIsSortedInAscending === true && <BiSortAZ
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                    {titleIsSortedInAscending === false && <BiSortZA
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                </div>
                            </th>
                            <th> Your Progress </th>
                            <th onClick={handleDateSortMondaytoSunday}>
                                <div className='icon-wrapper'>
                                    broadcast
                                    {dateIsSortedInAscending === '' && <BiSortAlt2
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                    {dateIsSortedInAscending === true && <BiSortDown
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                    {dateIsSortedInAscending === false && <BiSortUp
                                        onClick={handleTitleSort}
                                        className='sort-icon' />}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.length > 0 && userList.map((seasonalAnime) => {
                            return (
                                <MySeasonalEntry
                                    anime={seasonalAnime}
                                    key={seasonalAnime.mal_id}
                                    handleCheckBox={handleCheckBox}
                                    handleIncreaseEpisodeCounter={handleIncreaseEpisodeCounter}
                                    handleDecreaseEpisodeCounter={handleDecreaseEpisodeCounter}
                                    getAnimeAirDate={getAnimeAirDate}
                                    getAnimeBroadcastTime={getAnimeBroadcastTime}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

