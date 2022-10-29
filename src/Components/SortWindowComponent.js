import { BiExit } from 'react-icons/bi'

export default function SortWindowComponent({
    handleSortWindow,
    handleSortByScore,
    handleSortByPopularity,
    handleSortByAirDate
}) {
  return (
    <div className='popup-window-wrapper'>
    <div className='exit-button' onClick={handleSortWindow}>
        <BiExit className='exit-icon' />
    </div>
    <div className='popup-window'>
        <div className='filter-header'>
            Sort the Seasonal Anime List
        </div>
        <div className='filter-time-button-container'>
            <button className='sort-button' onClick={handleSortByScore}> Score </button>
            <button className='sort-button' onClick={handleSortByPopularity}> popularity </button>
            <button className='sort-button' onClick={handleSortByAirDate}> Air Date </button>
        </div>
    </div>
</div>
  )
}
