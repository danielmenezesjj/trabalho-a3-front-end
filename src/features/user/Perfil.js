import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from '../common/headerSlice'
import InputText from '../../components/Input/InputText'
import TextAreaInput from '../../components/Input/TextAreaInput'
import ToogleInput from '../../components/Input/ToogleInput'
import SelectBox from "../../components/Input/SelectBox"
import axios from 'axios'; // Ou use fetch se preferir

function Register() {
    const dispatch = useDispatch();
    const [perfilOptions, setPerfilOptions] = useState([]);
    const [formData, setFormData] = useState({
        role: ""
    });

    const updateFormValue = ({ updateType, value }) => {
        console.log(updateType, value);
        setFormData((prevData) => ({
            ...prevData,
            [updateType]: value,
        }));
        console.log(perfilOptions)
        const selectedOption = perfilOptions.find(option => option.value == value);
        if (selectedOption) {
            setFormData((prevData) => ({
                ...prevData,
                perfis: [{ id: value, role: selectedOption.label }],
            }));
        }
    };

    const handleSubmit = async () => {
        const dataToSubmit = {
            role: formData.nome,

        };
        console.log(dataToSubmit)
        try {
            // Enviando a solicitação POST com fetch
            const response = await fetch('http://localhost:9005/public/perfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Defina o tipo de conteúdo como JSON
                },
                body: JSON.stringify(dataToSubmit), // Converta os dados em JSON
            });
            if (response.status == '201') {
                dispatch(showNotification({ message: "Perfil cadastrado com sucesso!", status: 1 }));
                window.location.reload();
            } 
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
        }
    };

    return (
        <>
            <TitleCard title="Cadastrar perfil" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Perfil" defaultValue={formData.nome} updateFormValue={updateFormValue} updateType="nome" />
                </div>
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={handleSubmit}>Cadastrar</button>
                </div>
            </TitleCard>
        </>
    );
}

export default Register;