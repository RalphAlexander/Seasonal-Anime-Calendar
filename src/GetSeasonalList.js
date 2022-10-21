// import Seasonal from "./Seasonal"
import Axios from "axios"
import { useEffect, useState } from "react"
import moment from 'moment-timezone'

import './App.css';
import './ListView.css'

const USER_LIST_KEY = 'userList'
const VIEW_KEY = 'view'

export default function GetSeasonalList() {
	
	const [seasonalList, setSeasonalList] = useState()
	const [userList, setUserList] = useState([])
	const [view, setView] = useState('seasonal view')
	const [timezone, setTimezone] = useState('America/Vancouver')
	const [filterTime, setFilterTime] = useState('24:00')

	useEffect(()=>{
		// console.log(moment.tz.names())
		getData(1,true)

		const localStorageUserList = JSON.parse(localStorage.getItem(USER_LIST_KEY))
		if (localStorageUserList) setUserList(localStorageUserList)

		const localStorageView = JSON.parse(localStorage.getItem(VIEW_KEY))
		if (localStorageView) setView(localStorageView)
	},[])

	useEffect(()=>{
		console.log(userList)


		localStorage.setItem(USER_LIST_KEY,JSON.stringify(userList))
	},[userList])

	useEffect(()=>{
		localStorage.setItem(VIEW_KEY,JSON.stringify(view))
	},[view])

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
				else if (userList.find(element => element === anime) === undefined) return [...current, anime]
				else return [...current]
			})
			
		}
	
	  return (
		<>
			<div className='anime-card'>
				<button onClick={handleClick} >
					add to list
				</button>
					<div className='anime-card-title'>
						{anime.title}
					</div>
					<img 
						src={anime.images.jpg.image_url} 
						className='anime-card-img'/>
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
			<h1>
				Seasonal Anime
			</h1>
				<div className='card-container'>
				{seasonalList.map((seasonalAnime) =>{
					return(
							<Seasonal 
								anime={seasonalAnime}
								key={seasonalAnime.mal_id}
							/>
							)
						})}
				</div>
			</>
		)
	}
	
	function List({
		anime
	}){
		moment.tz.setDefault("Asia/Tokyo");
		var formattedDate = String((anime.aired.prop.from.day) + '/' + (anime.aired.prop.from.month) + '/' + (anime.aired.prop.from.year) + ' ' + anime.broadcast.time)
		var time = moment(formattedDate,'DD/MM/YYYY hh:mm')
		
	
		return(
			<>
				<tr className="cell">
					<td>1</td>
					<td>
						<img 
						src={anime.images.jpg.image_url}
						className='list-view-img' />
					</td>
					<td>{anime.title}</td>
					<td></td>
					<td></td>
					<td>{time.tz(timezone).format('dddd')}</td>
					<td>{time.tz(timezone).format('ha')}</td>
				</tr>
			</>
		)
	}

	function handleTitleSort(){
		// sort by title
	}

	function MyListView(){
		return (
			<>
				<h1>
					My Seasonal List
				</h1>
				
				<table>
					<thead> 
						<tr>
							<th> No. </th>
							<th> Image </th>
							<th> 
								Name
								<button onClick={handleTitleSort}>
									sort
								</button>
							 </th>
							<th> Your Progress </th>
							<th> Episodes aired </th>
							<th> Air Date  </th>
							<th> Air Time  </th>
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
		moment.tz.setDefault("Asia/Tokyo");
		var formattedDate = String((anime.aired.prop.from.day) + '/' + (anime.aired.prop.from.month) + '/' + (anime.aired.prop.from.year) + ' ' + anime.broadcast.time)
		var time = moment(formattedDate,'DD/MM/YYYY hh:mm')
		console.log(time.tz(timezone).format('dddd hh:mm'))
		const currentTime = moment().tz(timezone).format('dddd hh:mm')

		const test = (moment().tz(timezone).add(24,'hours').format('dddd hh:mm'))

		// console.log(test  time)
		// if time within currentTine until currentTime + filterTime
		// then: render function (return:)

		// if (
		// 	time.tz(timezone).format('dddd')===moment.tz(timezone).format('dddd') &&

		// 	){}
	}

	function SeasonalCalendar(){
		
		function handleClickDisplay24h(){
			setFilterTime('24:00')
		}
		function handleClickDisplay48h(){
			setFilterTime('48:00')
		}
		function handleClickDisplay72h(){
			setFilterTime('72:00')
		}

		return (
			<>
				<h1>
					Seasonal Calendar
				</h1>
				<div>
					<button onClick={handleClickDisplay24h}> 24h </button>
					<button onClick={handleClickDisplay48h}> 48h </button>
					<button onClick={handleClickDisplay72h}> 72h </button>
				</div>
				<div>
					{userList && userList.map((anime)=>{
						return(
							<SeasonalCalendarAnime 
							anime = {anime}
							key = {anime.mal_id}/>
						)
					})}
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

	if (seasonalList!==undefined){		
	return (
		<>
			<div>
				<button onClick={handleSeasonalAnimeViewClick}> Seasonal Anime </button>
				<button onClick={handleMyListViewClick}> My List </button>
				<button onClick={handleSeasonalCalendarClick}> My Seasonal Calendar </button>
				<button onClick={handleRemoveAll}> Remove All </button>
				{view === 'seasonal view' && <SeasonalView />}
				{view === 'list view' && <MyListView />}
				{view === 'seasonal calendar view' && <SeasonalCalendar />}
			</div>
		</>
  )
}
			
	
}
