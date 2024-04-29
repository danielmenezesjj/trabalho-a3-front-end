import moment from "moment"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import InputTextDisable from '../../../components/Input/InputTextDisable'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios';


function ProfileSettings() {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changesMade, setChangesMade] = useState(false);
    const login = localStorage.getItem('login');
    const [avatar, setAvatar] = useState(null);

    const updatedFields = useRef({});


    const updateProfile = async () => {
        try {
            if (!avatar) {
                // Caso nenhum arquivo tenha sido selecionado
                return;
            }

            const formData = new FormData();
            formData.append('file', avatar);

            // Enviar a requisição usando fetch
            const response = await fetch(`http://localhost:9005/public/users/ftPerfil/${login}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            console.log('Avatar uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }

        if (changesMade) {
            const updatedData = { ...data, ...updatedFields.current };
            const payload = {
                name: updatedData.name,
                email: updatedData.email,
                cidade: updatedData.cidade,
                about: updatedData.about,
                isActive: updatedData.isActive
            };
            fetch(`http://localhost:9005/public/users/${login}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(response => {
                    if (response.ok) {
                        dispatch(showNotification({ message: 'Usuario Atualizado com sucesso!', status: 1 }));

                        // Adiciona um atraso de 2 segundos (2000 milissegundos) antes de recarregar a página
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                    return response.json();
                })
                .then(data => {
                    // Lógica para manipular a resposta bem-sucedida
                })
            setChangesMade(false); // Resetar o estado para indicar que as alterações foram processadas
        } else {

        }
    };

    const updateFormValue = ({ updateType, value }) => {
        console.log(`Updating ${updateType} with value: ${value}`);
        if (data[updateType] !== value) {
            updatedFields.current = {
                ...updatedFields.current,
                [updateType]: value,
            };
            console.log('updatedFields:', updatedFields.current);
            setChangesMade(true);
        }
    };


    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const uploadAvatar = async () => {

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:9005/public/users/${login}`);
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [login]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <TitleCard title="Configurações de perfil" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={data?.name || ''} updateFormValue={updateFormValue} updateType="name" />
                    <InputTextDisable labelTitle="Email" defaultValue={data?.email || ''} updateFormValue={updateFormValue} updateType="email" />
                    <InputText labelTitle="Cidade" defaultValue={data?.cidade || ''} updateFormValue={updateFormValue} updateType="cidade" />
                    <TextAreaInput labelTitle="About" defaultValue={data?.about || ''} updateFormValue={updateFormValue} updateType="about" />
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputTextDisable labelTitle="Cadastrado" defaultValue={format(new Date(data?.createdAt), 'dd/MM/yyyy HH:mm:ss') || ''} updateFormValue={updateFormValue} />
                    <InputTextDisable labelTitle="Perfil do usuário" defaultValue={data?.perfis[0].role || ''} updateFormValue={updateFormValue} />
                    <ToogleInput
                        updateType="isActive"
                        labelTitle="Status"
                        defaultValue={data?.isActive}
                        updateFormValue={updateFormValue}
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div className="flex items-center">
                        <label htmlFor="avatar" className="cursor-pointer">
                            <AiOutlineUser className="w-8 h-8 mr-2 text-gray-600" />
                            Choose Avatar
                        </label>
                        <input type="file" id="avatar" className="hidden" onChange={handleAvatarChange} />
                    </div>
                    {avatar && (
                        <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className="w-20 h-20 object-cover rounded-full border-2 border-gray-300" />
                    )}
                </div>
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => updateProfile()}>
                        Update
                    </button>
                </div>
            </TitleCard>
        </>
    );
};
export default ProfileSettings;