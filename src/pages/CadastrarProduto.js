import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import CreateProduto from '../features/createProduto/createProduto'

function ExternalPage(){


    return(
        <div className="">
                <CreateProduto />
        </div>
    )
}

export default ExternalPage