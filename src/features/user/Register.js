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
        nome: "",
        email: "",
        password: "",
        cidade: "",
        about: "",
        isActive: true,
        perfis: [],
    });

    useEffect(() => {
        // Chamada à API para obter a lista de perfis
        fetch('http://localhost:9005/public/perfil')
            .then(response => response.json())
            .then(data => {
                const options = data.map(perfil => ({
                    value: perfil.id, // Use o ID do perfil
                    label: perfil.role, // Exiba o role do perfil
                }));
                setPerfilOptions(options);
            })
            .catch(error => {
                console.error('Erro ao obter as opções de perfil:', error);
            });
    }, []);

    const updateFormValue = ({ updateType, value }) => {
        console.log(updateType, value);
        // Atualiza o formData com base no updateType
        setFormData((prevData) => ({
            ...prevData,
            [updateType]: value,
        }));
        // Encontre a opção correspondente em perfilOptions
        console.log(perfilOptions)
        const selectedOption = perfilOptions.find(option => option.value == value);
        if (selectedOption) {
            // Se a opção correspondente existir, atualize o perfil selecionado
            setFormData((prevData) => ({
                ...prevData,
                perfis: [{ id: value, role: selectedOption.label }],
            }));
        }
    };

    const handleSubmit = async () => {
        const dataToSubmit = {
            email: formData.email,
            password: formData.password,
            isActive: formData.isActive,
            name: formData.nome,
            cidade: formData.cidade,
            about: formData.about,
            perfis: formData.perfis,
        };
        console.log(dataToSubmit)
        try {
            // Enviando a solicitação POST com fetch
            const response = await fetch('http://localhost:9005/public/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Defina o tipo de conteúdo como JSON
                },
                body: JSON.stringify(dataToSubmit), // Converta os dados em JSON
            });
            if (response.status == '201') {
                dispatch(showNotification({ message: "Funcionario cadastrado com sucesso!", status: 1 }));
                window.location.reload();
            } 
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
        }
    };

    return (
        <>
            <TitleCard title="Cadastrar funcionário" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Nome" defaultValue={formData.nome} updateFormValue={updateFormValue} updateType="nome" />
                    <InputText labelTitle="Email" defaultValue={formData.email} updateFormValue={updateFormValue} updateType="email" />
                    <InputText labelTitle="Senha" defaultValue={formData.password} updateFormValue={updateFormValue} updateType="password" />
                    <InputText labelTitle="Cidade" defaultValue={formData.cidade} updateFormValue={updateFormValue} updateType="cidade" />
                    <TextAreaInput labelTitle="About" defaultValue={formData.about} updateFormValue={updateFormValue} updateType="about" />
                    <SelectBox
                        labelTitle="Perfil"
                        defaultValue={formData.perfis.length ? formData.perfis[0].id : ''}
                        containerStyle="form-control w-full"
                        placeholder="Selecione um perfil..."
                        options={perfilOptions}
                        updateType="language"
                        updateFormValue={updateFormValue}
                    />
                    <ToogleInput updateType="isActive" labelTitle="Status" defaultValue={formData.isActive} updateFormValue={updateFormValue} />
                </div>
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={handleSubmit}>Cadastrar</button>
                </div>
            </TitleCard>
        </>
    );
}

export default Register;