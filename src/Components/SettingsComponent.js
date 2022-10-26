import { BiExit } from 'react-icons/bi'

// @param handleClickSettings - Function that sets the state settingsView to its opposite boolean value
// @param handleChangeSettings - Function that sets the state of displayType to the value of the event listener
// @param displayType - string to specify the display type of the seasonal anime list
//
// Renders the settings popup window component
export default function SettingsComponent({
    handleClickSettings,
    handleChangeSettings,
    displayType
}) {
    return (
        <div className='popup-window-wrapper'>
            <div className='exit-button' onClick={handleClickSettings}>
                <BiExit className='exit-icon' />
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
