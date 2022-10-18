import Axios from "axios"
import { useEffect, useState } from "react"

export default function GetRandomAnime() {

	// POST /animelist/anime/1

	const [anime, setAnime] = useState(null)
	const [animeScore, setAnimeScore] = useState(0)

	useEffect(()=>{
		getAnime()
	
		// while (animeScore<1 ){
		// 	getAnime()
		// }
	},[])

	const getAnime = () =>{
		Axios.get(`https://api.jikan.moe/v4/random/anime`).then((res) => {
		setAnime(res.data)
		setAnimeScore(res.data.data.score)
		})

		// score < 7.5 or null, re-run this function to get an anime
		// with a score about 7.5
		
			// .then((data) => console.log(data))
		
		// console.log(temp)
	}
	
	

  return (
	<div className='max-height'
	// style={{ 
	// 	backgroundImage: `url(${anime.data.images.jpg.image_url})` 
	//   }}
	  >
		<div>
			
				<a
					href={'anime.data.url'}
					key={'anime.id'}> 
					{anime !== null && anime.data.title}
					
				</a> 
			
				{anime !== null &&<img src= {anime.data.images.jpg.image_url} />}
		</div>
	</div>
  )
}
