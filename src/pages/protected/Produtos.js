import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Produtos from '../../features/Produtos'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Produtos"}))
      }, [])
      
    return(
        <Produtos />
    )
}

export default InternalPage