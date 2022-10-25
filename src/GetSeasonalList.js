
import Axios from 'axios'
import { AiFillSetting, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BiExit, BiSortAlt2, BiSortAZ, BiSortZA, BiSortUp, BiSortDown, BiTrash } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

import './App.css';
import './ListView.css'
import './SeasonalCalendar.css'

const USER_LIST_KEY = 'userList'
const VIEW_KEY = 'view'
const FILTER_TIME_KEY = 'filter_time'
const SORTED_ASCENDING_TITLE_KEY = 'ascendingTitle'
const SORTED_ASCENDING_DATE_KEY = 'ascendingTitle'
const DISPLAY_TYPE_KEY = 'displayType'

const timezone = DateTime.local().zoneName

export default function GetSeasonalList() {

	const [seasonalList, setSeasonalList] = useState()
	const [userList, setUserList] = useState([])
	const [view, setView] = useState('seasonal view')
	const [displayType, setDisplayType] = useState('RowDisplay')
	const [settingsView, setSettingsView] = useState(false)
	const [deleteView, setDeleteView] = useState(false)
	const [filterTime, setFilterTime] = useState(24)
	const [titleIsSortedInAscending,setTitleIsSortedInAscending] = useState('')
	const [dateIsSortedInAscending, setDateIsSortedInAscending] = useState('')
	

	useEffect(()=>{
		getData(1,true)
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
	},[])

	useEffect(()=>{
		localStorage.setItem(DISPLAY_TYPE_KEY, JSON.stringify(displayType))
	},[displayType])

	useEffect(()=>{
		localStorage.setItem(FILTER_TIME_KEY, JSON.stringify(filterTime))
	},[filterTime])

	useEffect(()=>{
		localStorage.setItem(VIEW_KEY ,JSON.stringify(view))
	},[view])

	useEffect(()=>{
		localStorage.setItem(USER_LIST_KEY, JSON.stringify(userList))
		console.log(userList)
	},[userList])

	useEffect(()=>{
		localStorage.setItem(SORTED_ASCENDING_TITLE_KEY ,JSON.stringify(titleIsSortedInAscending))
		console.log(titleIsSortedInAscending)
	},[titleIsSortedInAscending])

	useEffect(()=>{
		localStorage.setItem(SORTED_ASCENDING_DATE_KEY, JSON.stringify(dateIsSortedInAscending))
	},[dateIsSortedInAscending])

    const getData = async (pageNumber,hasPage) => {

		if (hasPage) {
			return await Axios.get(`https://api.jikan.moe/v4/seasons/now?page=${pageNumber}`)
			.then((res)=>{
				if (pageNumber===1){
					setSeasonalList(res.data.data)
				} else {
					setSeasonalList((current)=>{
						return [...current,...res.data.data]
					})
				}
				getData(pageNumber+1,res.data.pagination.has_next_page)
			})
		}
	}


	function SeasonalMAL({anime}) {

		// handles adding an anime the to userList state
		function handleClick(){
			setUserList((current)=>{
				// if list is empty, add the anime to the list
				if (userList === undefined) return [anime]
				// if anime is not in user list, append it to the end of the list
				else if (userList.find(element => element.mal_id === anime.mal_id) === undefined) return [...current, anime]
				else return [...current]
			})
			
		}
	
	  return (
		<>
			<div className='anime-card'>
				<div className='anime-card-title-wrapper'>
						<div className='anime-card-title'>
							{anime.title}
						</div>
					</div>
					<div className='anime-card-button-wrapper'>
						<button 
							className='anime-card-button'
							onClick={handleClick} >
								add to list
						</button>
					</div>
					<div className='anime-card-img-wrapper'>
						<img 
							src={anime.images.jpg.image_url} 
							className='anime-card-img'/>
					</div>
					<div className='anime-card-synopsis-wrapper'>
					<div className="anime-card-synopsis">
						{anime.synopsis}
					</div>
				</div>
			</div>
		</>
	  )
	}
	function SeasonalRow({anime}) {

		// handles adding an anime the to userList state
		function handleClick(){
			setUserList((current)=>{
				// if list is empty, add the anime to the list
				if (userList === undefined) return [anime]
				// if anime is not in user list, append it to the end of the list
				else if (userList.find(element => element.mal_id === anime.mal_id) === undefined) return [...current, anime]
				else return [...current]
			})
			
		}
	
	  return (
		<>
			<div className='anime-card-row'>
				<div className='anime-card-row-img-wrapper'>
						<img 
							src={anime.images.jpg.image_url} 
							className='anime-card-row-img'/>
							<div className='anime-card-row-background'/>
					
				</div>
				<div className='anime-card-row-title'>
					{anime.title}
				</div>
				<div className='anime-card-row-button-wrapper'>
						<button 
							className='anime-card-button'
							onClick={handleClick} >
								Add to List
						</button>
					</div>
			</div>
		</>
	  )
	}


	function SeasonalView(){

		return (
			<>
			<div className='seasonal-view-body'>
				<h1>
					Seasonal Anime
				</h1>
					<div className='card-container'>
					{displayType === 'MALStyle' && 
					seasonalList.map((seasonalAnime) =>{
						return(
								<SeasonalMAL 
									anime={seasonalAnime}
									key={seasonalAnime.mal_id}
								/>
								)
							})}
					{displayType === 'RowDisplay' && 
					seasonalList.map((seasonalAnime) =>{
						return(
								<SeasonalRow 
									anime={seasonalAnime}
									key={seasonalAnime.mal_id}
								/>
								)
							})}
					{/* {displayType === 'CardDisplay' && 
					seasonalList.map((seasonalAnime) =>{
						return(
								<SeasonalRow 
									anime={seasonalAnime}
									key={seasonalAnime.mal_id}
								/>
								)
							})} */}
					</div>
					</div>
			</>
		)
	}


	function List({
		anime
	}){
		if (anime.episode===null || !anime.hasOwnProperty('episode')){
			anime.episode = 0
		}
		if (anime.checked===null || !anime.hasOwnProperty('checked')){
			anime.checked = false
		}
		
		const handleCheckBox = () => {
			setUserList(
				userList.map(current => {
					if (current.mal_id === anime.mal_id){
						return {...current, checked: !anime.checked}
					}
					return current
				})
			)
		}
			
		const handleIncreaseEpisodeCounter = () => {
			setUserList(
				userList.map(current => {
					if (current.mal_id === anime.mal_id){
						if (anime.episode && anime.episode === anime.episodes){
							return current
						}
						return {...current, episode: anime.episode+1}
					}
					return current
				})
			)
		}
		const handleDecreaseEpisodeCounter = () => {
			setUserList(
				userList.map(current => {
					if (current.mal_id === anime.mal_id){
						if (anime.episode===0){
							return current
						}
						return {...current, episode: anime.episode-1}
					}
					return current
				})
			)
		}

		var startDate, startMonth
		if (anime.aired.prop.from.day < 10){
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10){
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		
		var formattedDate
		var date
		if (anime.broadcast.time){
			formattedDate = String((anime.aired.prop.from.year) + '-' +
			startMonth + '-' + startDate + ' ' + anime.broadcast.time)
			date = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
			date = date.setZone(timezone)
		} else {
			formattedDate = (anime.aired.prop.from.year) + '-' +
			startMonth + '-' + startDate
			date = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
			date = date.setZone(timezone)
		}
		

		return(
			<>
				<tr>
					<td>
						<label>
							<input 
								type='checkbox'
								checked={anime.checked}
								onChange={handleCheckBox}
								/>
						</label>
					</td>
					<td>
						<div className='list-view-img-wrapper'>
							<img 
							src={anime.images.jpg.image_url}
							className='list-view-img'/>
						</div>
					</td>
					<td>{anime.title}</td>
					<td>						
						<div className='progress-flex'>
							<div className='minus-icon-wrapper'>
								<AiOutlineMinus onClick={handleDecreaseEpisodeCounter}
								className='plus-minus-icon' /> 
							</div>
							<div className='counter'>
								{anime.episode} / {anime.episodes ? anime.episodes : '?'} 
							</div>
							<div className='plus-icon-wrapper'>
								<AiOutlinePlus onClick={handleIncreaseEpisodeCounter}
								className='plus-minus-icon' /> 
							</div>
						</div>
						
					</td>
					<td className='table-time'>
						<div>
							{date.weekdayLong}, {date.hour < 10 && '0'}{date.hour}:
							{date.minute === 0 ? '00' : date.minute} 
						</div>{!anime.broadcast.time && '(Assumed to be 00:00 JST)'}
					</td>
				</tr>
			</>
		)
	}

	function handleTitleSort(){
		var sortedUserList
		if (titleIsSortedInAscending){
			sortedUserList = userList.sort((a,b) =>{
				return ((a.title < b.title) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a,b) =>{
				return ((a.title > b.title) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current=>{
				return current
			}))

		if (titleIsSortedInAscending || !titleIsSortedInAscending) setTitleIsSortedInAscending(!titleIsSortedInAscending)
		else setTitleIsSortedInAscending(true)
		setDateIsSortedInAscending('')
	}

	// TODO
	// update the logic a bit: instead of todays date, use an arbitrary date (monday or sunday)
	function handleDateSortFromNow() {
		var sortedUserList
		if (dateIsSortedInAscending){
			sortedUserList = userList.sort((a,b) =>{
				return ((getTime(a) < getTime(b)) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a,b) =>{
				return ((getTime(a) > getTime(b)) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current=>{
				return current
			}))
		if (dateIsSortedInAscending || !dateIsSortedInAscending) setDateIsSortedInAscending(!dateIsSortedInAscending)
		else setDateIsSortedInAscending(true)
		setTitleIsSortedInAscending('')
	}

	function handleDateSortMondaytoSunday() {
		var sortedUserList
		if (dateIsSortedInAscending){
			sortedUserList = userList.sort((a,b) =>{
				return ((getSunday(a) < getSunday(b)) ? 1 : -1)
			})
		} else {
			sortedUserList = userList.sort((a,b) =>{
				return ((getSunday(a) > getSunday(b)) ? 1 : -1)
			})
		}
		setUserList(
			sortedUserList.map(current=>{
				return current
			}))
		if (dateIsSortedInAscending || !dateIsSortedInAscending) setDateIsSortedInAscending(!dateIsSortedInAscending)
		else setDateIsSortedInAscending(true)
		setTitleIsSortedInAscending('')
	}

	const MyListView = () =>{


// TODO
// possible idea: add a "are you sure button when removing"
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
									onClick={()=> {setDeleteView(!deleteView)}}/>
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
								<List 
									anime={seasonalAnime}
									key={seasonalAnime.mal_id}
								/>
									)})}
						</tbody>
					</table>
				
				</div>
			</>
		)

	}
	function SeasonalCalendarAnime({
		anime
	}){
		var startDate, startMonth
		if (anime.aired.prop.from.day < 10){
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10){
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		var formattedDate = String(
			(anime.aired.prop.from.year) + '-' + startMonth + '-' + 
			startDate + ' ' + anime.broadcast.time
		) 

		
		var date = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
		date = date.setZone(timezone)

		var currentTime = DateTime.now().setZone(timezone)
		var diffInWeeks = currentTime.diff(date,'weeks')
		
		date = date.plus({weeks:Math.abs(Math.ceil(diffInWeeks.values.weeks))})
		
		var diffInHours = date.diff(currentTime,['hours'])
		var diffInDaysAndHours = date.diff(currentTime,['days','hours'])

		var diffDays, diffHours
		if (diffInDaysAndHours.values.days === 1){
			diffDays = String(diffInDaysAndHours.values.days) + ' day left and '
		} else diffDays = String(diffInDaysAndHours.values.days) + ' days left and '
		if (Math.round(diffInDaysAndHours.values.hours) === 1) {
			diffHours = String(Math.round(diffInDaysAndHours.values.hours)) + ' hour left'
		} else diffHours = String(Math.round(diffInDaysAndHours.values.hours)) + ' hours left'


		if (diffInHours.values.hours < filterTime){
			return (
				<>
					<div className='seasonal-calendar-card'>
						<div className='seasonal-calendar-anime-title'>
							{anime.title}
						</div>
					<div className='seasonal-calendar-anime-img-wrapper'>
						<img 
							src={anime.images.jpg.image_url}
							className='seasonal-calendar-anime-img' />
					</div>
						<div className='seasonal-calendar-anime-text'>
							Approximately: {diffInDaysAndHours.values.days > 0 && diffDays } {diffHours}
						</div>
					</div>
				</>
			)
		} 
	}

	function getTime(anime) {
		if (!anime.broadcast.time) return 150
		
		var startDate, startMonth
		if (anime.aired.prop.from.day < 10){
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10){
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		var formattedDate = String(
			(anime.aired.prop.from.year) + '-' + startMonth + '-' + 
			startDate + ' ' + anime.broadcast.time
		) 

		
		var date = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
		date = date.setZone(timezone)


		var currentTime = DateTime.now().setZone(timezone)
		var diffInWeeks = currentTime.diff(date,'weeks')
		
		date = date.plus({weeks:Math.abs(Math.ceil(diffInWeeks.values.weeks))})
		return date.diff(currentTime,['hours'])
		}

	function getSunday(anime) {
		
		var startDate, startMonth
		if (anime.aired.prop.from.day < 10){
			startDate = '0' + anime.aired.prop.from.day
		} else startDate = anime.aired.prop.from.day
		if (anime.aired.prop.from.month < 10){
			startMonth = '0' + anime.aired.prop.from.month
		} else startMonth = anime.aired.prop.from.month

		var formattedDate = String(
			(anime.aired.prop.from.year) + '-' + startMonth + '-' + 
			startDate + ' ' + anime.broadcast.time
		) 

		
		var date = DateTime.fromSQL(formattedDate, { zone: "Asia/Tokyo" })
		date = date.setZone(timezone)

		var currentTime = DateTime.fromSQL('2022-10-23 11:59')
		var diffInWeeks = currentTime.diff(date,'weeks')
		
		// if (diffInWeeks.values === undefined) {
		// 	diffInWeeks.values = 0
		// }

		date = date.plus({weeks:Math.abs(Math.ceil(diffInWeeks.values.weeks))})
		return date.diff(currentTime,['hours'])
		}

	function SeasonalCalendar(){
		
		function handleClickDisplay24h(){
			setFilterTime(24)
		}
		function handleClickDisplay48h(){
			setFilterTime(48)
		}
		function handleClickDisplay72h(){
			setFilterTime(72)
		}
		function handleClickDisplay96h(){
			setFilterTime(96)
		}
		function handleClickDisplay120h(){
			setFilterTime(120)
		}

		
		
		return (
			<>
			{/* <SortByDate /> */}
				<h1>
					Seasonal Calendar
				</h1>
				<div>
					<button onClick={handleClickDisplay24h}> 24h </button>
					<button onClick={handleClickDisplay48h}> 48h </button>
					<button onClick={handleClickDisplay72h}> 72h </button>
					<button onClick={handleClickDisplay96h}> 96h </button>
					<button onClick={handleClickDisplay120h}> 120h </button>
				</div>
				<div>
					<button onClick={handleDateSortFromNow}> Sort By Time </button>
				</div>
				<div>
					<h3>
						Upcoming in the next {filterTime} hours:
					</h3>
					<div className='seasonal-calendar-grid'>
					{userList && userList.map((anime)=>{
						return(

							<SeasonalCalendarAnime 
							anime = {anime}
							key = {anime.mal_id}/>
							)
						}
					
					)}
					</div>
				</div>
			</>
		)
	}

	function handleSeasonalAnimeViewClick(){
		setView('seasonal view')
	}
	function handleMyListViewClick(){
		setView('list view')
	}
	function handleSeasonalCalendarClick(){
		setView('seasonal calendar view')
	}
	function handleRemoveAll(){
		setUserList([])
	}
	function handleRemoveSelected() {
		setUserList(userList.filter(anime => !anime.checked))
	}

	function handleChangeSettings(e){
		setDisplayType(e.target.value)
	}

	function SettingsComponent() {
		return (
				<div className='popup-window-wrapper'>
					<div className='exit-button'onClick={handleClickSettings}>
						<BiExit className='exit-icon'/>
					</div>
					<div className='settings-window'>
						<div className='settings-header'>
							Select Layout:
						</div>
						<div className='settings-body-wrapper'>
							<div className='option1'>
								<input type="radio" value="RowDisplay" name="style" 
								onChange={handleChangeSettings}
								className='radio'
								checked={displayType === 'RowDisplay'}
								/> 
							</div>
							<div className='layout1'>
								<img src={process.env.PUBLIC_URL + '/RowDisplay.png'} />
							</div>
							<div className='option2'>
								<input type="radio" value="MALStyle" name="style" 
								onChange={handleChangeSettings}
								className='radio'
								checked={displayType === 'MALStyle'}
								/> 
							</div>
							<div className='layout2'>
								<img src={process.env.PUBLIC_URL + '/MALDisplay.png'} />
							</div>
						</div>
					</div>
				</div>
		)
	}

	function DeleteWindowComponent(){
		return (
			<div className='popup-window-wrapper'>
					<div className='exit-button'onClick={ handleClickDelete}>
						<BiExit className='exit-icon'/>
					</div>
					<div className='delete-window'>
						<div className='delete-header'>
							Do you want to remove?
						</div>
						<div className='button-container'>
							<button className='remove-button' onClick={handleRemoveSelected}> Remove Selected </button>
							<button className='remove-button' onClick={handleRemoveAll}> Remove All </button>
						</div>
					</div>
				</div>
		)
	}

	function handleClickSettings() {
		setSettingsView(!settingsView)
	}

	function handleClickDelete() {
		setDeleteView(!deleteView)
	}

	if (seasonalList!==undefined){		
	return (
		<>
		{settingsView && <SettingsComponent />}
		{deleteView && <DeleteWindowComponent />}
			<div className={settingsView||deleteView ? 'z-index':''}>
				<nav className='nav-header'>
					<div className='settings-icon-wrapper'>
					<AiFillSetting 
						onClick={handleClickSettings}
						className='settings-icon'/>
					</div>
					<div className={view === 'seasonal view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalAnimeViewClick}> Seasonal Anime </div>
					<div className='separator'> | </div>  
					<div className={view === 'list view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleMyListViewClick}> My Seasonal List </div> 
					<div className='separator'> | </div>  
					<div className={view === 'seasonal calendar view' ? 'nav-elements-focused' : 'nav-elements'} onClick={handleSeasonalCalendarClick}> My Seasonal Calendar </div> 
				</nav>						
				<div>
				</div>
				{view === 'seasonal view' && <SeasonalView />}
				{view === 'list view' && <MyListView />}
				{view === 'seasonal calendar view' && <SeasonalCalendar />}
			</div>
			
		</>
  )
}	
}
