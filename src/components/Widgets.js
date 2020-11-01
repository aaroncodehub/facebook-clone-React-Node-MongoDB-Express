import React from 'react'
import './Widgets.scss'

const Widget = () => {
    return (
        <div className='widgets'>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/CleverProgrammerr/&tabs=timeline&small_header=false&height=1500&adapt_container_width=true&hide_cover=false&show_facepile=true" 
            title='facebook'
            width='340'
            height='100%'
            style={{border:'none', overflow:'hidden'}}
            scrolling='none'
            frameBorder='0'
            allowtransparency='true'
            allow='encrypted-media'
            >
            </iframe>
        </div>
    )
}

export default Widget
