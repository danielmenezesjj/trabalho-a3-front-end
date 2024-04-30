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






const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  // {
  //   path: '/app/dashboard',
  //   icon: <Squares2X2Icon className={iconClasses} />,
  //   name: 'Dashboard',
  // },
  // {
  //   path: '/app/leads', // url
  //   icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  //   name: 'Leads', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
  //   name: 'Transactions', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },

  // {
  //   path: '/app/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/app/blank',
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/app/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: '404',
  //     },
  //   ]
  // },
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
        path: '/app/integration', // url
        icon: <BsBoxes  className={iconClasses} />, // icon component
        name: 'Produtos', // name that appear in Sidebar
      }
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <BsPersonLock  className={`${iconClasses} inline`} />, // icon component
    name: 'Administrador', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
        name: 'Cadastrar funcionario', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
        name: 'Components',
      }
    ]
  },

]

export default routes


