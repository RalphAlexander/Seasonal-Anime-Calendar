import GetSeasonalList from './GetSeasonalList';

// Renders the entire page with the footer included
export default function PageComponent() {
    return (
        <div className='page-container'>
            <GetSeasonalList />
            <div className='footer'>
                <footer>
                    © 2022 Ralph Alexander. All rights reserved.
                </footer>
                <a href='https://github.com/FishTomato/Seasonal-Anime-Calendar'>
                    <img
                        className='gh-footer-icon'
                        src={process.env.PUBLIC_URL + '/GitHub-Mark-32px.png'} />
                </a>
            </div>
        </div>
    )
}