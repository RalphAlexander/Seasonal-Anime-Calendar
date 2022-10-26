import { BiExit } from 'react-icons/bi'

// @param handleFilterSettings - Function that sets the state filterView to its opposite boolean value
// @param handleDisplayWithinTime - Function that sets the state filterTime to its opposite boolean value
//
// Renders the filter popup window component
export default function FilterWindowComponent({
    handleFilterSettings,
    handleDisplayWithinTime
}) {
    return (
        <div className='popup-window-wrapper'>
            <div className='exit-button' onClick={handleFilterSettings}>
                <BiExit className='exit-icon' />
            </div>
            <div className='popup-window'>
                <div className='filter-header'>
                    How many hours to Filter upcoming Animes by?
                </div>
                <div className='filter-time-button-container'>
                    <button className='filter-time-button' onClick={() => { handleDisplayWithinTime(24) }}> 24h </button>
                    <button className='filter-time-button' onClick={() => { handleDisplayWithinTime(48) }}> 48h </button>
                    <button className='filter-time-button' onClick={() => { handleDisplayWithinTime(72) }}> 72h </button>
                    <button className='filter-time-button' onClick={() => { handleDisplayWithinTime(96) }}> 96h </button>
                    <button className='filter-time-button' onClick={() => { handleDisplayWithinTime(120) }}> 120h </button>
                </div>
            </div>
        </div>
    )
}
