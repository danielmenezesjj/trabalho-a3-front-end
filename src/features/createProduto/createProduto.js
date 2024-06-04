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



function CreateProduto() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nmproduto: "",
        stativo: true,
        vlunitario: 0,
        cdproduto: "",
        quantidade: 0,
        file: null,
    });


    const updateFormValue = ({ updateType, value }) => {
        setFormData((prevData) => ({
            ...prevData,
            [updateType]: value,
        }));
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            file: file,
        }));
    };

    const validateForm = () => {
        const { nmproduto, cdproduto, vlunitario, quantidade, file } = formData;
        if (!nmproduto || !cdproduto || vlunitario <= 0 || quantidade <= 0 || !file) {
            dispatch(showNotification({ message: "Favor prencher todos os campos ", status: 0 }));
            return false;
        }
        return true;
    };


    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('nmproduto', formData.nmproduto);
        formDataToSubmit.append('stativo', formData.stativo);
        formDataToSubmit.append('vlunitario', formData.vlunitario);
        formDataToSubmit.append('cdproduto', formData.cdproduto);
        formDataToSubmit.append('quantidade', formData.quantidade);
        formDataToSubmit.append('file', formData.file);
        try {
            const response = await fetch('http://localhost:9004/api/produtos', {
                method: 'POST',
                body: formDataToSubmit,
            });
            console.log(response)
            if (response.status == 200) {
                dispatch(showNotification({ message: "Produto cadastrado com sucesso!", status: 1 }));
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                console.error('Erro ao cadastrar produto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
        } 
    };

    return (
        <>
            <TitleCard title="Cadastrar produto" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Nome do Produto" defaultValue={formData.nmproduto} updateFormValue={updateFormValue} updateType="nmproduto" />
                    <InputText labelTitle="Código do Produto" defaultValue={formData.cdproduto} updateFormValue={updateFormValue} updateType="cdproduto" />
                    <InputText labelTitle="Valor Unitário" defaultValue={formData.vlunitario} updateFormValue={updateFormValue} updateType="vlunitario" />
                    <InputText labelTitle="Quantidade" defaultValue={formData.quantidade} updateFormValue={updateFormValue} updateType="quantidade" />
                    <ToogleInput updateType="stativo" labelTitle="Status Ativo" defaultValue={formData.stativo} updateFormValue={updateFormValue} />
                    <div className="form-control w-full">
                        <label className="label" htmlFor="file">Imagem do Produto:</label>
                        <input
                            type="file"
                            id="file"
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button className={`btn btn-primary float-right ${isLoading ? 'loading' : ''}`} onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Cadastrar Produto'}
                    </button>
                </div>

            </TitleCard>
        </>
    );
}

export default CreateProduto;