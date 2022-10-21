import React, { useEffect, useState } from 'react'
import Axios from "axios"

export default function GetTopAnime() {

    const [animeList, setAnimeList] = useState(null)
    const [randomNumber, setRandomNumber] = useState(0)
    // const [anime, setAnime] = useState(null)
    // const [anime2, setAnime2] = useState(null)
    // const [animeIndex, setAnimeIndex] = useState()
    
    const getTopAnime = () => {
        
        Axios.get(`https://api.jikan.moe/v4/seasons/now`)
        .then((res)=> {
            console.log(res.data)
            setAnimeList(res.data)
            setRandomNumber(randomValue(0,res.data.pagination.items.count))
        })
        
    }

    // const getRandomAnime = () =>{
	// 	Axios.get(`https://api.jikan.moe/v4/random/anime`).then((res) => {
	// 	setAnime(res.data)
	// 	})
    // }

    // function TestAnime() {
    //     Axios.get(`https://api.jikan.moe/v4/random/anime`)
    //     .then((res) => {
    //         if (anime=== null){
    //             setAnime(res.data)
    //         }
	// 	})
    // }
    // function TestAnime2() {
    //     Axios.get(`https://api.jikan.moe/v4/random/anime`)
    //     .then((res) => {
    //         if (anime2=== null){
    //             setAnime2(res.data)
    //         }
	// 	})
    // }

    // generates a random number from min inclusive to max exclusive
    function randomValue(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
      }

  return (
    <div
    className='frame'
    //  className='screen'
     >
         <button
            onClick={getTopAnime}>
                Get Top Anime
            </button>
                {animeList !== null && animeList.data[randomNumber].title}
            {/* <TestAnime />
            <TestAnime2 />
            {anime !== null && <div className='left-side'
            style={{
                backgroundImage: `url(${anime.data.images.jpg.image_url})` 
              }}
              >
                <TestAnime />
                <div className='text'>
                    {anime.data.title }
                    {anime.data.score}
                </div>
            </div>}
            {anime2 !== null && <div className='right-side'
            style={{ 
                backgroundImage: `url(${anime2.data.images.jpg.image_url})` 
              }}
              >
                <TestAnime2 />
                {anime2.data.title}  {anime2.data.score}
            </div>} */}
    </div>
  )
}
