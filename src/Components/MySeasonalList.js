import { BiSortAlt2, BiSortAZ, BiSortZA, BiSortUp, BiSortDown, BiTrash } from 'react-icons/bi'

import MySeasonalEntry from './MySeasonalEntry'

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
        <>
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
                                onClick={handleOpenDeleteWindow}/>
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
                    {userList.length > 0 && userList.map((seasonalAnime) =>{
                        return(
                            <MySeasonalEntry 
                                anime={seasonalAnime}
                                key={seasonalAnime.mal_id}
                                handleCheckBox = {handleCheckBox}
                                handleIncreaseEpisodeCounter = {handleIncreaseEpisodeCounter}
                                handleDecreaseEpisodeCounter = {handleDecreaseEpisodeCounter}
                                getAnimeAirDate = {getAnimeAirDate}
                                getAnimeBroadcastTime = {getAnimeBroadcastTime}
                            />
                                )})}
                    </tbody>
                </table>
            </div>
        </>
    )

}

