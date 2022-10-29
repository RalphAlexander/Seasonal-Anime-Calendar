import { AiFillSetting } from 'react-icons/ai'
import { BiTimeFive, BiSortAlt2 } from 'react-icons/bi'

export default function Navbar({
    handleClickSettings,
    handleFilterSettings,
    handleSeasonalAnimeViewClick,
    handleMyListViewClick,
    handleSeasonalCalendarClick,
    handleSortWindow,
    view
}) {
    return (
        <nav className='nav-header'>
            <div className='navabar-icon-wrapper'>
                <AiFillSetting
                    onClick={handleClickSettings}
                    className='navbar-icon' />
            </div>
            <div className={view === 'seasonal anime view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalAnimeViewClick}> Seasonal Anime </div>
            <div className='navabar-icon-wrapper'>
                <BiSortAlt2
                    onClick={handleSortWindow}
                    className='navbar-icon' />
            </div>
            <div className='separator'> | </div>
            <div className={view === 'my seasonal list view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleMyListViewClick}> My Seasonal List </div>
            <div className='separator'> | </div>
            <div className={view === 'my seasonal calendar view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalCalendarClick}> My Seasonal Calendar </div>
            <div className='navabar-icon-wrapper'>
                <BiTimeFive
                    onClick={handleFilterSettings}
                    className='navbar-icon' />
            </div>
        </nav>
    )
}