import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CadastrarPerfil from '../../features/user/Perfil'

function Perfil(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Perfil"}))
      }, [])


    return(
        <CadastrarPerfil />
    )
}

export default Perfil