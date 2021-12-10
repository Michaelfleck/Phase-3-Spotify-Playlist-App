import React from 'react'
import Song from './Song';

function Listbox({songListElements}) {
    
    return (
        <div>
            {songListElements.map(el => <Song key={el.id} track={el} />)}
        </div>
    )
}

export default Listbox
