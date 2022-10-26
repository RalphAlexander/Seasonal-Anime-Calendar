
import Axios from 'axios'
import { AiFillSetting } from 'react-icons/ai'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

import './App.css';
import './ListView.css'
import './SeasonalCalendar.css'

import SettingsComponent from './SettingsComponent'
import MySeasonalList from './MySeasonalList'
import SeasonalAnimeViewType from './SeasonalAnimeViewType'
import MySeasonalCalendar from './MySeasonalCalendar'
import DeleteWindowComponent from './DeleteWindowComponent'

const USER_LIST_KEY = 'userList'
const VIEW_KEY = 'view'
const FILTER_TIME_KEY = 'filter_time'
const SORTED_ASCENDING_TITLE_KEY = 'ascendingTitle'
const SORTED_ASCENDING_DATE_KEY = 'ascendingDate'
const DISPLAY_TYPE_KEY = 'displayType'

const timezone = DateTime.local().zoneName

export default function GetSeasonalList() {

	const [seasonalList, setSeasonalList] = useState()
	const [userList, setUserList] = useState([])
	const [view, setView] = useState('seasonal anime view')
	const [displayType, setDisplayType] = useState('RowDisplay')
	const [settingsView, setSettingsView] = useState(false)
	const [deleteView, setDeleteView] = useState(false)
	const [filterTime, setFilterTime] = useState(24)
	const [titleIsSortedInAscending, setTitleIsSortedInAscending] = useState('')
	const [dateIsSortedInAscending, setDateIsSortedInAscending] = useState('')


	useEffect(() => {
		getData(1, true)
		const localStorageUserList = JSON.parse(localStorage.getItem(USER_LIST_KEY))
		if (localStorageUserList) setUserList(localStorageUserList)

		const localStorageView = JSON.parse(localStorage.getItem(VIEW_KEY))
		if (localStorageView) setView(localStorageView)

		const localStorageFilterTime = JSON.parse(localStorage.getItem(FILTER_TIME_KEY))
		if (localStorageFilterTime) setFilterTime(localStorageFilterTime)

		const localStorageDisplayType = JSON.parse(localStorage.getItem(DISPLAY_TYPE_KEY))
		if (localStorageDisplayType) setDisplayType(localStorageDisplayType)

		const localStorageTitleAscending = JSON.parse(localStorage.getItem(SORTED_ASCENDING_TITLE_KEY))
		setTitleIsSortedInAscending(localStorageTitleAscending)

		const localStorageDateAscending = JSON.parse(localStorage.getItem(SORTED_ASCENDING_DATE_KEY))
		setDateIsSortedInAscending(localStorageDateAscending)
	}, [])

	useEffect(() => {
		localStorage.setItem(DISPLAY_TYPE_KEY, JSON.stringify(displayType))
	}, [displayType])

	useEffect(() => {
		localStorage.setItem(FILTER_TIME_KEY, JSON.stringify(filterTime))
	}, [filterTime])

	useEffect(() => {
		localStorage.setItem(VIEW_KEY, JSON.stringify(view))
	}, [view])

	useEffect(() => {
		localStorage.setItem(USER_LIST_KEY, JSON.stringify(userList))
		console.log(userList)
	}, [userList])

	useEffect(() => {
		localStorage.setItem(SORTED_ASCENDING_TITLE_KEY, JSON.stringify(titleIsSortedInAscending))
		console.log(titleIsSortedInAscending)
	}, [titleIsSortedInAscending])

	useEffect(() => {
		localStorage.setItem(SORTED_ASCENDING_DATE_KEY, JSON.stringify(dateIsSortedInAscending))
	}, [dateIsSortedInAscending])

	// @param pageNumber - the current page number it is fetching data from
	// @param hasPage - boolean value of if the current page number exists
	//
	// fetches the data which is stored in the state seasonalList
	const getData = async (pageNumber, hasPage) => {

		if (hasPage) {
			return await Axios.get(`https://api.jikan.moe/v4/seasons/now?page=${pageNumber}`)
				.then((res) => {
					if (pageNumber === 1) {
						setSeasonalList(res.data.data)
					} else {
						setSeasonalList((current) => {
							return [...current, ...res.data.data]
						})
					}
					getData(pageNumber + 1, res.data.pagination.has_next_page)
				})
		}
	}

	// @param anime - objects to be modified
	//
	// Adds the anime to the list if it doesn't already exist in userList, resets the
	// boolean state titleIsSortedInAscending and dateIsSortedInAscending
	const handleAddAnimeToList = (anime) => {
		setUserList((current) => {
			if (userList === undefined) return [anime]
			else if (userList.find(element => element.mal_id === anime.mal_id) === undefined) return [...current, anime]
			else return [...current]
		})
		setTitleIsSortedInAscending('')
		setDateIsSortedInAscending('')
	}

	// @param anime - object to be modified
	//
	// Sets the property checked of the anime object to its opposite boolean value
	const handleCheckBox = (anime) => {
		setUserList(
			userList.map(current => {
				if (current.mal_id === anime.mal_id) {
					return { ...current, checked: !anime.checked }
				}
				return current
			})
		)
	}
	// @param anime - object to be modified
	//
	// Increases the current count of the property episode of the anime object
	const handleIncreaseEpisodeCounter = (anime) => {
		setUserList(
			userList.map(current => {
				if (current.mal_id === anime.mal_id) {
					if (anime.episode && anime.episode === anime.episodes) {
						return current
					}
					return { ...current, episode: anime.episode + 1 }
				}
				return current
			})
		)
	}

	// @param anime - object to be modified
	//
	// Decreases the current count of the property episode of the anime object
	const handleDecreaseEpisodeCounter = (anime) => {
		setUserList(
			userList.map(current => {
				if (current.mal_id === anime.mal_id) {
					if (anime.episode === 0) {
						return current
					}
					return { ...current, episode: anime.episode - 1 }
				}
				return current
			})
		)
	}

	// Sets the state of delete view to its opposite
	const handleOpenDeleteWindow = () => {
		setDeleteView(!deleteView)
	}

	// @param anime - object to get data from
	//
	// Returns the date of the anime object in the user's local time
	const getAnimeBroadcastTime = (anime) => {
		var startDate, startMonth
		if (anime.aired.prop.from.day < 10) {
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10) {
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		var formattedDate =
			String((anime.aired.prop.from.year) + '-' +
				startMonth + '-' + startDate + ' ' + anime.broadcast.time)

		formattedDate = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
		return formattedDate.setZone(timezone)
	}

	// @param anime - object to get data from
	//
	// Returns the air date of the anime object
	const getAnimeAirDate = (anime) => {
		var startDate, startMonth
		if (anime.aired.prop.from.day < 10) {
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10) {
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		var formattedDate =
			String((anime.aired.prop.from.year) + '-' +
				startMonth + '-' + startDate)
		return DateTime.fromSQL(formattedDate)
	}

	// @param anime - object to get data from
	//
	// Returns an object with the number of days and hours until the next episode airs
	const getDaysAndHoursUntilNextEpisode = (anime) => {
		var date = getAnimeAirDate(anime)

		var currentTime = DateTime.now().setZone(timezone)
		var diffInWeeks = currentTime.diff(date, 'weeks')

		date = date.plus({ weeks: Math.abs(Math.ceil(diffInWeeks.values.weeks)) })
		return date.diff(currentTime, ['days', 'hours']).values
	}

	// @param anime - object to get data from
	//
	// Returns an int of the number of  hours until the next episode airs
	const getRelativeHoursUntilAiring = (anime) => {
		var date = getAnimeAirDate(anime)

		var currentTime = DateTime.now().setZone(timezone)
		var diffInWeeks = currentTime.diff(date, 'weeks')

		date = date.plus({ weeks: Math.abs(Math.ceil(diffInWeeks.values.weeks)) })
		return date.diff(currentTime, ['hours']).values.hours
	}

	// Sorts and update the state of the userList array in order of the object's title
	// in ascending or descending order depending on the boolean state titleIsSortedInAscending
	const handleTitleSort = () => {
		var sortedUserList
		if (titleIsSortedInAscending) {
			sortedUserList = userList.sort((a, b) => {
				return ((a.title < b.title) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a, b) => {
				return ((a.title > b.title) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current => {
				return current
			}))

		if (titleIsSortedInAscending || !titleIsSortedInAscending) setTitleIsSortedInAscending(!titleIsSortedInAscending)
		else setTitleIsSortedInAscending(true)
		setDateIsSortedInAscending('')
	}

	// Sorts and update the state of the userList array in order of the object's air time
	// relative to the current date time in ascending or descending order depending on 
	// the boolean state dateIsSortedInAscending
	const handleDateSortFromNow = () => {
		var sortedUserList
		if (dateIsSortedInAscending) {
			sortedUserList = userList.sort((a, b) => {
				return ((getRelativeHoursUntilAiring(a) < getRelativeHoursUntilAiring(b)) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a, b) => {
				return ((getRelativeHoursUntilAiring(a) > getRelativeHoursUntilAiring(b)) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current => {
				return current
			}))
		if (dateIsSortedInAscending || !dateIsSortedInAscending) setDateIsSortedInAscending(!dateIsSortedInAscending)
		else setDateIsSortedInAscending(true)
		setTitleIsSortedInAscending('')
	}

	// @param anime - object to get data from
	//
	// Returns the number of hours until the next episode relative to monday at midnight,
	// if anime does not have broadcast.time property, it will return 170, which is more
	// than the number of hours in a week
	const getTimeToSundayAscending = (anime) => {

		// this ensures that object(s) with no broadcast.time property will always
		// be sorted in the last position(s)
		if (!anime.broadcast.time || !anime.aired.prop.from) {
			return 170
		}

		var date = getAnimeBroadcastTime(anime)
		var currentTime = DateTime.fromSQL('2022-10-23 11:59')
		var diffInWeeks = currentTime.diff(date, 'weeks')

		date = date.plus({ weeks: Math.abs(Math.ceil(diffInWeeks.values.weeks)) })
		return date.diff(currentTime, ['hours']).values.hours
	}

	// @param anime - object to get data from
	//
	// Returns the number of hours until the next episode relative to monday at midnight,
	// if anime does not have broadcast.time property, it will return -1, which is smaller
	// than the smallest possible value
	const getTimeToSundayDescending = (anime) => {

		// this ensures that object(s) with no broadcast.time property will always
		// be sorted in the last position(s)
		if (!anime.broadcast.time || !anime.aired.prop.from) {
			return -1
		}

		var date = getAnimeBroadcastTime(anime)
		var currentTime = DateTime.fromSQL('2022-10-23 11:59')
		var diffInWeeks = currentTime.diff(date, 'weeks')

		date = date.plus({ weeks: Math.abs(Math.ceil(diffInWeeks.values.weeks)) })
		return date.diff(currentTime, ['hours']).values.hours
	}

	// Sorts and update the state of the userList array in order of the object's air time
	// from monday to sunday in ascending or descending order depending on the boolean
	// state dateIsSortedInAscending
	const handleDateSortMondaytoSunday = () => {
		var sortedUserList
		if (dateIsSortedInAscending) {
			sortedUserList = userList.sort((a, b) => {
				return ((getTimeToSundayDescending(a) < getTimeToSundayDescending(b)) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a, b) => {
				return ((getTimeToSundayAscending(a) > getTimeToSundayAscending(b)) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current => {
				return current
			}))
		if (dateIsSortedInAscending || !dateIsSortedInAscending) setDateIsSortedInAscending(!dateIsSortedInAscending)
		else setDateIsSortedInAscending(true)
		setTitleIsSortedInAscending('')
	}

	// @param hours - int value to alter the filterTime state
	//
	// Sets the state filterTime to its opposite boolean value
	const handleDisplayWithinTime = (hours) => {
		setFilterTime(hours)
	}

	// Sets the state of view to 'seasonal anime view'
	const handleSeasonalAnimeViewClick = () => {
		setView('seasonal anime view')
	}

	// Sets the state of view to 'my seasonal list view'
	const handleMyListViewClick = () => {
		setView('my seasonal list view')
	}

	// Sets the state of view to 'my seasonal calendar view'
	const handleSeasonalCalendarClick = () => {
		setView('my seasonal calendar view')
	}

	// Sets the state of userList to an empty array
	const handleRemoveAll = () => {
		setUserList([])
	}
	
	// Updates the userList state by removing object(s) within userList with 
	// the boolean checked === true 
	const handleRemoveSelected = () => {
		setUserList(userList.filter(anime => !anime.checked))
	}

	// @param e - event listener
	//
	// Sets the state of displayType to the value of the event listener
	const handleChangeSettings = (e) => {
		setDisplayType(e.target.value)
	}

	// Sets the state settingsView to its opposite boolean value
	const handleClickSettings = () => {
		setSettingsView(!settingsView)
	}

	// Sets the state deleteView to its opposite boolean value
	const handleClickDelete = () => {
		setDeleteView(!deleteView)
	}

	if (seasonalList !== undefined) {
		return (
			<>
				{settingsView && <SettingsComponent
					handleClickSettings={handleClickSettings}
					handleChangeSettings={handleChangeSettings}
					displayType={displayType} />}
				{deleteView &&
					<DeleteWindowComponent
						handleClickDelete={handleClickDelete}
						handleRemoveSelected={handleRemoveSelected}
						handleRemoveAll={handleRemoveAll} />}
				<div className={settingsView || deleteView ? 'z-index' : ''}>
					<nav className='nav-header'>
						<div className='settings-icon-wrapper'>
							<AiFillSetting
								onClick={handleClickSettings}
								className='settings-icon' />
						</div>
						<div className={view === 'seasonal anime view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalAnimeViewClick}> Seasonal Anime </div>
						<div className='separator'> | </div>
						<div className={view === 'my seasonal list view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleMyListViewClick}> My Seasonal List </div>
						<div className='separator'> | </div>
						<div className={view === 'my seasonal calendar view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalCalendarClick}> My Seasonal Calendar </div>
					</nav>
					<div>
					</div>
					{view === 'seasonal anime view' &&
						<SeasonalAnimeViewType
							handleAddAnimeToList={handleAddAnimeToList}
							seasonalList={seasonalList}
							displayType={displayType}
						/>}
					{view === 'my seasonal list view' &&
						<MySeasonalList
							handleTitleSort={handleTitleSort}
							handleCheckBox={handleCheckBox}
							handleDateSortMondaytoSunday={handleDateSortMondaytoSunday}
							handleOpenDeleteWindow={handleOpenDeleteWindow}
							handleDateSortFromNow={handleDateSortFromNow}
							handleIncreaseEpisodeCounter={handleIncreaseEpisodeCounter}
							handleDecreaseEpisodeCounter={handleDecreaseEpisodeCounter}
							getAnimeAirDate={getAnimeAirDate}
							getAnimeBroadcastTime={getAnimeBroadcastTime}
							titleIsSortedInAscending={titleIsSortedInAscending}
							dateIsSortedInAscending={dateIsSortedInAscending}
							userList={userList}
						/>}
					{view === 'my seasonal calendar view' &&
						<MySeasonalCalendar
							handleDisplayWithinTime={handleDisplayWithinTime}
							handleDateSortFromNow={handleDateSortFromNow}
							getDaysAndHoursUntilNextEpisode={getDaysAndHoursUntilNextEpisode}
							filterTime={filterTime}
							userList={userList}
						/>}
				</div>
			</>
		)
	}
}
