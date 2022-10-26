import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function MySeasonalEntry({
	handleCheckBox,
	handleIncreaseEpisodeCounter,
	handleDecreaseEpisodeCounter,
	getAnimeAirDate,
	getAnimeBroadcastTime,
	anime
}) {
	if (anime.episode === null || !anime.hasOwnProperty('episode')) {
		anime.episode = 0
	}
	if (anime.checked === null || !anime.hasOwnProperty('checked')) {
		anime.checked = false
	}


	var date
	if (anime.broadcast.time) {
		date = getAnimeBroadcastTime(anime)
	} else {
		date = getAnimeAirDate(anime)
	}

	var hour
	var minute
	if (date.hour < 10) {
		hour = '0' + date.c.hour
	} else hour = date.hour
	if (date.minute === 0) {
		minute = '00'
	} else minute = date.minute

	return (
		<>
			<tr>
				<td>
					<label>
						<input
							type='checkbox'
							checked={anime.checked}
							onChange={() => { handleCheckBox(anime) }}
						/>
					</label>
				</td>
				<td>
					<div className='list-view-img-wrapper'>
						<img
							src={anime.images.jpg.image_url}
							className='list-view-img' />
					</div>
				</td>
				<td>{anime.title}</td>
				<td>
					<div className='progress-flex'>
						<div className='minus-icon-wrapper'>
							<AiOutlineMinus onClick={() => { handleDecreaseEpisodeCounter(anime) }}
								className='plus-minus-icon' />
						</div>
						<div className='counter'>
							{anime.episode} / {anime.episodes ? anime.episodes : '?'}
						</div>
						<div className='plus-icon-wrapper'>
							<AiOutlinePlus onClick={() => { handleIncreaseEpisodeCounter(anime) }}
								className='plus-minus-icon' />
						</div>
					</div>

				</td>
				<td className='table-time'>
					<div>
						{anime.broadcast.time ? `${date.weekdayLong}, ${hour}:${minute}` : 'NA'}
					</div>
				</td>
			</tr>
		</>
	)
}
