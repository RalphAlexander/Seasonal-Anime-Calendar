export default function Seasonal({
    anime,

}) {


    function handleClick(){

    }

  return (
    <div className='anime-card'>
        <div className='anime-card-title'>
            {anime.title}
        </div>
        
            {/* {!anime.images.jpg.image_url &&  */}
            <img 
                src={anime.images.jpg.image_url} 
                className='anime-card-img'/>
            <div className='anime-card-synopsis-wrapper'>
            <div className="anime-card-synopsis">
                {anime.synopsis}
            </div>
        </div>
    </div>
  )
}
