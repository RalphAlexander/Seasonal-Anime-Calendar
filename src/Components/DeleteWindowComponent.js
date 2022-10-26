import { BiExit } from 'react-icons/bi'


export default function DeleteWindowComponent({
    handleClickDelete,
    handleRemoveSelected,
    handleRemoveAll
}) {
    return (
        <div className='popup-window-wrapper'>
            <div className='exit-button' onClick={handleClickDelete}>
                <BiExit className='exit-icon' />
            </div>
            <div className='popup-window'>
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