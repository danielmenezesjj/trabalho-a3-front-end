import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ListFuncionario from '../../features/Funcionarios'

function Funcionarios(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Funcionarios"}))
      }, [])


    return(
        <ListFuncionario />
    )
}

export default Funcionarios