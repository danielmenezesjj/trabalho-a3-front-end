import moment from 'moment';
import 'moment/locale/pt-br'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'




function Transactions() {
    moment.locale('pt-br');
    const [funcionarios, setFuncionarios] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9005/public/users');
                const data = await response.json();
                setFuncionarios(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = async (id) => {
        const confirmed = window.confirm('Você tem certeza que deseja excluir este funcionário?');
        if (!confirmed) return;
        try {
            const response = await fetch(`http://localhost:9005/public/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setFuncionarios((prevFuncionarios) => prevFuncionarios.filter((funcionario) => funcionario.id !== id));
                dispatch(showNotification({ message: "Funcionario deletado com sucesso!", status: 1 }));
            } else {
                console.error('Erro ao excluir funcionário:', await response.text());
                dispatch(showNotification({ message: "Erro ao deletar funcionario!", status: 1 }));

            }
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    return (
        <>
            <TitleCard title="Funcionários" topMargin="mt-2">
                {/* Lista de membros da equipe em formato de tabela */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Cidade</th>
                                <th>Sobre</th>
                                <th>Cargo</th>
                                <th>Data de cadastro</th>
                                <th>Ações</th> {/* Nova coluna para ações */}
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.map((funcionario, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={funcionario.imagem || 'https://daniel-estudos-app.s3.us-east-2.amazonaws.com/usersPadrao.png'} alt="Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{funcionario.name}</td>
                                    <td>{funcionario.email}</td>
                                    <td>{funcionario.cidade}</td>
                                    <td>{funcionario.about}</td>
                                    <td>{funcionario.perfis?.[0]?.role ?? 'não contém perfil'}</td>
                                    <td>{moment(funcionario.createdAt).format('D [de] MMM YYYY')}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => handleDeleteClick(funcionario.id)}>
                                        <TrashIcon className="w-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Transactions;