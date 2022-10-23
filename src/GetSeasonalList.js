
import Axios from 'axios'
import { AiOutlineSetting } from 'react-icons/ai'
import { DateTime } from 'luxon'
import { useEffect, useState, useRef } from 'react'

import './App.css';
import './ListView.css'
import './SeasonalCalendar.css'

const USER_LIST_KEY = 'userList'
const VIEW_KEY = 'view'
const FILTER_TIME_KEY = 'filter_time'
const SORTED_ASCENDING_TITLE_KEY = 'ascendingTitle'


const timezone = DateTime.local().zoneName

export default function GetSeasonalList() {

	const [seasonalList, setSeasonalList] = useState()
	const [userList, setUserList] = useState([])
	const [view, setView] = useState('seasonal view')
	const [displayType, setDisplayType] = useState('MALStyle')
	const [dropdownView, setDropdownView] = useState(false)
	const [filterTime, setFilterTime] = useState(24)
	const [titleIsSortedInAscending,setTitleIsSortedInAscending] = useState()
	const [dateIsSortedInAscending, setDateIsSortedInAscending] = useState()
	

	useEffect(()=>{
		getData(1,true)

		const localStorageUserList = JSON.parse(localStorage.getItem(USER_LIST_KEY))
		if (localStorageUserList) {
			setUserList(localStorageUserList)
		}

		const localStorageView = JSON.parse(localStorage.getItem(VIEW_KEY))
		if (localStorageView) setView(localStorageView)

		const localStorageTitleSort = JSON.parse(localStorage.getItem(SORTED_ASCENDING_TITLE_KEY))
		if (localStorageTitleSort) setTitleIsSortedInAscending(localStorageTitleSort)

		const localStorageFilterTime = JSON.parse(localStorage.getItem(FILTER_TIME_KEY))
		if (localStorageFilterTime) setFilterTime(localStorageFilterTime)
	},[])

	useEffect(()=>{
		localStorage.setItem(FILTER_TIME_KEY,JSON.stringify(filterTime))
	},[filterTime])

	useEffect(()=>{
		localStorage.setItem(VIEW_KEY,JSON.stringify(view))
		
		// localStorage.setItem(USER_LIST_KEY,JSON.stringify(userList))
	},[view])

	useEffect(()=>{
		localStorage.setItem(USER_LIST_KEY,JSON.stringify(userList))
		// console.log(localStorage.getItem(USER_LIST_KEY))
		// setUserList(
		// 	userList.sort((a,b) => {
		// 		let res = (getTime(a) > getTime(b) ? 1 : -1)
		// 		if (res===1 || res===-1) return res
		// 		else return ((a.title < b.title) ? 1 : -1)
		// 	})
		// )
	},[userList])

	// useEffect(()=>{
	// 	localStorage.seItem(SORTED_ASCENDING_TITLE_KEY, JSON.stringify(titleIsSortedInAscending))
	// },[titleIsSortedInAscending])

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


	function Seasonal({anime}) {

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

	function SeasonalView(){

		return (
			<>
			<div className='seasonal-view-body'>
				<h1>
					Seasonal Anime
				</h1>
					<div className='card-container'>
					{
					// TODO
					displayType === 'MALStyle' && 
					seasonalList.map((seasonalAnime) =>{
						return(
								<Seasonal 
									anime={seasonalAnime}
									key={seasonalAnime.mal_id}
								/>
								)
							})}
					</div>
					</div>
			</>
		)
	}

	function List({
		anime
	}){
		
		const [isSelected, setIsSelected] = useState(false)

		const handleCheckBox = () => {

			setIsSelected(!isSelected)
		}
		anime.checked = isSelected

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


		return(
			<>
				<tr className="cell">
					<td>
						<input 
							type='checkbox'
							checked={isSelected}
							onChange={handleCheckBox}
							
						/>
					</td>
					<td>
						<img 
						src={anime.images.jpg.image_url}
						className='list-view-img'/>
					</td>
					<td>{anime.title}</td>
					<td></td>
					<td>{date.weekdayLong}, {date.hour < 10 && '0'}{date.hour}:{date.minute === 0 ? '00' : date.minute}</td>
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
		setUserList(sortedUserList)
		if (titleIsSortedInAscending || !titleIsSortedInAscending) setTitleIsSortedInAscending(!titleIsSortedInAscending)
		else setTitleIsSortedInAscending(true)

		setDateIsSortedInAscending(null)
	}
	function handleDateSort() {
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
		setUserList(sortedUserList)
		if (dateIsSortedInAscending || !dateIsSortedInAscending) setDateIsSortedInAscending(!dateIsSortedInAscending)
		else setDateIsSortedInAscending(true)
		
		setTitleIsSortedInAscending(null)
	}

	const MyListView = () =>{



		return (
			<>
				<h1>
					My Seasonal List
				</h1>
				
				<table>
					<thead> 
						<tr>
							<th></th>
							<th> Image </th>
							<th onClick={handleTitleSort}> 
								Name
							 {/* have an arrow pointing either up or down depending on 
							 titleIsSortedInAscending */}
							 </th>
							<th> Your Progress </th>
							<th onClick={handleDateSort}>
								Air Date and Air Time  
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
		
		// function SortByDate(){
		// 	setUserList(
		// 		userList.sort((a,b) => {
		// 			let res = (getTime(a) > getTime(b) ? 1 : -1)
		// 			if (res===1 || res===-1) return res
		// 			else return ((a.title < b.title) ? 1 : -1)
		// 		})
		// 	)
		// }
		
		
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
					<button onClick={handleDateSort}> Sort By Time </button>
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
		console.log(userList)
		setUserList(userList.filter(anime => !anime.checked))
	}

	//TODO
	//Fix the select stuff
	function DropdownComponent() {
		return (
			
				<div className='settings-window-wrapper'>
					<div className='exit-button'onClick={dropdown}> X </div>
					<div className='settings-window'>
						Settings:
						<select
							value={displayType}
							onChange={(e)=> {setDisplayType(e.target.value)}}
						>
							<option value='MALStyle'>MAL Style</option>
							<option value='RowDisplay'>Row Display</option>
							<option value='CardDisplay'>Card Display</option>
						</select>

					</div>
				</div>
		
		)
	}

	function dropdown() {
		setDropdownView(!dropdownView)
	}

	if (seasonalList!==undefined){		
	return (
		<>
		{dropdownView && <DropdownComponent />}
			<div 
			className={dropdownView ? 'z-index':''}
			>
				<div className='seasonal-list-view-container'>
					<div className='seasonal-list-view-mal' onClick={handleSeasonalAnimeViewClick}> Seasonal Anime Viewer </div>
					<div className='seasonal-list-view-rows' onClick={handleSeasonalAnimeViewClick}> </div>
				</div>
				<div>
					{/* <div className='settings-wrapper'> */}
						<AiOutlineSetting 
						onClick={dropdown}
						className='settings-icon'/>
					{/* </div> */}
					<div className='center'>
						<div className='center' onClick={handleMyListViewClick}> My List </div>
						<div className='center' onClick={handleSeasonalCalendarClick}> My Seasonal Calendar </div>
					</div>
				</div>
				<div>
					<div className='center' onClick={handleRemoveAll}> Remove All </div>
					<div className='center' onClick={handleRemoveSelected}> Remove Selected </div>
				</div>
				{view === 'seasonal view' && <SeasonalView />}
				{view === 'list view' && <MyListView />}
				{view === 'seasonal calendar view' && <SeasonalCalendar />}
			</div>
			
		</>
  )
}
			
	
}
