import { useEffect, useState, React, Fragment } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from "../common/headerSlice"




// Função para formatar valores monetários
const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

// Componente ProdutoCard para exibir cada produto individualmente
const ProdutoCard = ({ produto }) => (
    <TitleCard title={produto.nmproduto} topMargin="mt-2">
        <div className="flex items-center">
            <img
                alt="icon"
                src={produto.imagem}
                className="w-12 h-12 inline-block mr-4"
                onError={(e) => e.target.src = 'caminho/para/imagem/padrao.png'} // Imagem padrão em caso de erro
            />
            <div>
                <div className="text-lg text-green-600">{formatCurrency(produto.vlunitario)}</div>
                <div className="text-sm text-gray-500">Código do produto: {produto.cdproduto}</div>
            </div>
        </div>
        <div className="mt-2">Quantidade disponível: {produto.quantidade} UND </div>
        <div className="mt-6 text-right">
            <input type="checkbox" className="toggle toggle-success toggle-lg" checked={produto.stativo} />
        </div>
    </TitleCard>
);

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

    // Função para buscar dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9004/api/produtos');
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {produtos.map((produto, index) => (
                <ProdutoCard key={index} produto={produto} />
            ))}
        </div>
    );
};

export default Produtos;