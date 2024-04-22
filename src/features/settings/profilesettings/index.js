import moment from "moment"
import { useEffect, useState, React, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { Divider } from 'semantic-ui-react'
import Select from 'react-select';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Dialog from "@mui/material/Dialog"
import Slide from '@mui/material/Slide';


function ProfileSettings() {
    const [produtos, setProdutos] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [nmPessoa, setNmPessoa] = useState("");
    const [cpf, setCpf] = useState("");
    const [valorPago, setValorPago] = useState("");
    const [valorTotal, setValorTotal] = useState(0);
    const [quantidadePedida, setQuantidadePedida] = useState(1);
    const [loading, setLoading] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [dadosCadastradoCarrinho, setDadosCadastradoCarrinho] = useState('');
    const [isCodigoDialogOpen, setIsCodigoDialogOpen] = useState(false);




    const dispatch = useDispatch();

    useEffect(() => {
        const calculateTotal = () => {
            const total = productList.reduce((sum, product) => {
                return sum + (product.vlunitario * product.quantidadePedida);
            }, 0);

            console.log('Valor Total Calculado:', total); // Depuração: log do valor total calculado

            setValorTotal(total);
        };

        // Chame a função calculateTotal sempre que productList mudar
        calculateTotal();
    }, [productList]);


    // Call API to update profile settings changes
    const updateProfile = async () => {
        const orderDetails = {
            nmpessoa: nmPessoa,
            cpf: cpf,
            valorPago: valorPago,
            itens: productList.map(product => ({
                produtoCodigo: product.cdproduto,
                quantidadePedida: product.quantidadePedida
            }))
        };
        const apiUrl = 'http://localhost:9004/api/carrinho';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });


            if (response.ok) {
                const data = await response.json();
                const responseProdutos = await fetch(`http://localhost:9004/api/carrinho/${data.id}`);
                const resultCarrinhos = await responseProdutos.json();
                console.log(resultCarrinhos); // Verifique os dados retornados pelo servidor
                setDadosCadastradoCarrinho(resultCarrinhos);
                setIsCodigoDialogOpen(true);
                dispatch(showNotification({ message: 'Pedido enviado com sucesso', status: 1 }));
            } else {
                console.error('Erro ao enviar o pedido:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar o pedido:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProdutos = await fetch(`http://localhost:9004/api/produtos`);
                const resultProdutos = await responseProdutos.json();
                setProdutos(resultProdutos);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addProductToList = async () => {
        try {
            const response = await fetch(`http://localhost:9004/api/produtos/cdproduto/${productCode}`);
            const product = await response.json();
            const existingProductIndex = productList.findIndex(item => item.cdproduto === product.cdproduto);
            if (existingProductIndex !== -1) {
                const updatedProductList = [...productList];
                updatedProductList[existingProductIndex].quantidadePedida += 1;
                setProductList(updatedProductList);
            } else {
                product.quantidadePedida = 1;
                setProductList([...productList, product]);
            }
            setProductCode("");
            setProductCode("");
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };


    const handleProductCodeChange = (event) => {
        setProductCode(event.target.value);
    };


    const handleNmPessoaChange = (event) => {
        setNmPessoa(event.target.value);
    };


    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };


    const handleValorPagoChange = (event) => {
        setValorPago(event.target.value);
    };


    const handleQuantidadePedidaChange = (event) => {
        setQuantidadePedida(parseInt(event.target.value));
    };

    const openCodigoDialog = () => {
        setIsCodigoDialogOpen(true);

    };

    const closeCodigoDialog = () => {
        setIsCodigoDialogOpen(false);
    };

    const formatarDataHora = (data) => {

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;

    };
    const dataHoraAtual = formatarDataHora(new Date());


    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <TitleCard title="Carrinho De Compras" topMargin="mt-2">
                <Divider vertical>Dados Do Cliente</Divider>
                <div className="mt-6 space-y-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={nmPessoa}
                            onChange={handleNmPessoaChange}
                            placeholder="Nome da Pessoa"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={cpf}
                            onChange={handleCpfChange}
                            placeholder="CPF"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            value={metodoPagamento}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                            placeholder="Valor Pago"
                            className="input input-bordered w-full max-w-xs"
                        >
                            <option value="CARTÃO">CARTÃO</option>
                            <option value="DINHEIRO">DINHEIRO</option>
                        </select>
                    </div>
                    {metodoPagamento === 'DINHEIRO' && (
                        <input
                            type="text"
                            value={valorPago}
                            onChange={handleValorPagoChange}
                            placeholder="Valor Pago"
                            className="input input-bordered w-full max-w-xs"
                        />
                    )}
                </div>

                <Divider vertical>Produtos</Divider>
                <div className="mt-6">
                    <input
                        type="text"
                        value={productCode}
                        onChange={handleProductCodeChange}
                        onKeyPress={(e) => {
                            // Verifica se a tecla pressionada é Enter
                            if (e.key === 'Enter') {
                                addProductToList();
                            }
                        }}
                        placeholder="Product Code"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        type="number"
                        value={quantidadePedida}
                        onChange={handleQuantidadePedidaChange}
                        placeholder="Quantidade"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <button className="btn btn-primary ml-2" onClick={addProductToList}>
                        Add Product
                    </button>
                </div>

                <div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Nome</th>
                                <th style={{ width: '15%' }}>Preço</th>
                                <th style={{ width: '20%' }}>Imagem</th>
                                <th style={{ width: '15%' }}>Quantidade Pedida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.nmproduto}</td>
                                    <td>{product.vlunitario}</td>
                                    <td><img src={product.imagem} alt={product.nmproduto} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{product.quantidadePedida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3>Total: {valorTotal}</h3> {/* Exibir o valor total com duas casas decimais */}

                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => updateProfile()}>
                        Finalizar Compra
                    </button>
                </div>

                <Dialog
                    open={isCodigoDialogOpen}
                    onClose={closeCodigoDialog}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'up',
                        timeout: 500,
                    }}
                    maxWidth="md" // Defina a largura máxima desejada
                    fullWidth // Faz com que a Dialog ocupe toda a largura disponível
                    PaperProps={{
                        style: {
                            minHeight: '110px',
                            maxHeight: '900px',
                        },
                    }}
                >
                    <table class="printer-ticket">
                        <thead>
                            <tr>
                                <th class="title" colspan="3">MercaSoftware</th>
                            </tr>
                            <tr>
                                <th colSpan="3">{dataHoraAtual}</th>
                            </tr>
                            <tr>
                                <th colspan="3">
                                    {dadosCadastradoCarrinho.nmpessoa} <br />
                                    {dadosCadastradoCarrinho.cpf}
                                </th>
                            </tr>
                            <tr>
                                <th class="ttu" colspan="3">
                                    <b>Cupom não fiscal</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosCadastradoCarrinho.itens && dadosCadastradoCarrinho.itens.map((item, index) => (
                                <>
                                    {/* Primeira linha com o nome do produto */}
                                    <tr className="top">
                                        <td colSpan="3">{item.produto.nmproduto}</td>
                                    </tr>

                                    {/* Segunda linha com o preço, quantidade pedida e total */}
                                    <tr>
                                        <td>R${item.produto.vlunitario.toFixed(2)}</td>
                                        <td>{item.quantidadePedida}</td>
                                        <td>R${(item.produto.vlunitario * item.quantidadePedida).toFixed(2)}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr class="sup ttu p--0">
                                <td colspan="3">
                                    <b>Totais</b>
                                </td>
                            </tr>
                            <tr class="ttu">
                                <td colspan="2">Sub-total</td>
                                <td align="right">R$43,60</td>
                            </tr>
                            <tr class="ttu">
                                <td colspan="2">Total</td>
                                <td align="right">R$45,56</td>
                            </tr>
                            {dadosCadastradoCarrinho.valorPago !== null && (
                                <>
                                    <tr className="sup ttu p--0">
                                        <td colSpan="3">
                                            <b>Pagamentos</b>
                                        </td>
                                    </tr>
                                    <tr className="ttu">
                                        <td colSpan="2">Total pago</td>
                                        <td align="right">R${dadosCadastradoCarrinho.valorPago}</td>
                                    </tr>
                                    <tr className="ttu">
                                        <td colSpan="2">Troco</td>
                                        <td align="right">R${dadosCadastradoCarrinho.valorDoTroco}</td>
                                    </tr>
                                </>
                            )}

                            {/* oi */}
                            <tr class="sup">
                                <td colspan="3" align="center">
                                    <b>Pedido:</b>
                                </td>
                            </tr>
                            <tr class="sup">
                                <td colspan="3" align="center">
                                    www.mercasoftware.com
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Dialog>
            </TitleCard>
        </>
    );
}

export default ProfileSettings;