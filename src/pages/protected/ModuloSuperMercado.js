import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ModuloSuperMercado from '../../features/ModuloSuperMercado/ModuloVendas'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Carrinho "}))
      }, [])
    return(
        <ModuloSuperMercado />
    )
}

export default InternalPage