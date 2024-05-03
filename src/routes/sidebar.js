/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { BsBagPlus } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { BsPersonLock } from "react-icons/bs";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLayerPlus } from "react-icons/bi";


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const role = localStorage.getItem('grupo')


let routes = [];

if (role == 'OPERADOR') {

  routes = [
    {
      path: '', //no url needed as this has submenu
      icon: <AiOutlineShoppingCart className={`${iconClasses} inline`} />, // icon component
      name: 'Super mercado', // name that appear in Sidebar
      submenu: [
        {
          path: '/app/vendas', //url
          icon: <BsCartPlus className={submenuIconClasses} />, // icon component
          name: 'Realizar venda', // name that appear in Sidebar
        },
        {
          path: '/app/produtos', // url
          icon: <BsBoxes className={iconClasses} />, // icon component
          name: 'Produtos', // name that appear in Sidebar
        }
      ]
    },
  ]
} else {
  routes = [
    {
      path: '', //no url needed as this has submenu
      icon: <AiOutlineShoppingCart className={`${iconClasses} inline`} />, // icon component
      name: 'Super mercado', // name that appear in Sidebar
      submenu: [
        {
          path: '/app/vendas', //url
          icon: <BsCartPlus className={submenuIconClasses} />, // icon component
          name: 'Realizar venda', // name that appear in Sidebar
        },
        {
          path: '/app/produtos', // url
          icon: <BsBoxes className={iconClasses} />, // icon component
          name: 'Produtos', // name that appear in Sidebar
        },
        {
          path: '/app/createproduct', // url
          icon: <BiLayerPlus className={iconClasses} />, // icon component
          name: 'Cadastrar Produtos', // name that appear in Sidebar
        }
      ]
    },
    {
      path: '', //no url needed as this has submenu
      icon: <BsPersonLock className={`${iconClasses} inline`} />, // icon component
      name: 'Administrador', // name that appear in Sidebar
      submenu: [
        {
          path: '/app/register', // url
          icon: <AiOutlineUsergroupAdd  className={submenuIconClasses} />, // icon component
          name: 'Cadastrar funcionario', // name that appear in Sidebar
        },
        {
          path: '/app/funcionarios',
          icon: <AiOutlineUserSwitch  className={submenuIconClasses} />,
          name: 'Lista de funcionarios',
        },
        {
          path: '/app/components',
          icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
          name: 'Components',
        }
      ]
    },
  ]
}




export default routes


