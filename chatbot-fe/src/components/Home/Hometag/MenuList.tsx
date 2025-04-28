import { Menu } from 'antd'
import { HomeOutlined, MessageOutlined} from '@ant-design/icons'

interface MenuListProps {
    darkTheme: boolean;
    onClick: (key: string) => void;
    collapsed: boolean;
  }

  const MenuList: React.FC<MenuListProps> = ({ darkTheme, onClick, collapsed }) => {
    const handleMenuClick = (e: any) => {
        onClick(e.key);
      };

    const itemStyle: React.CSSProperties = collapsed ? {} : { whiteSpace: 'normal', height: 'auto' };


    return (
    <Menu theme={ darkTheme ? 'dark' : 'light'} 
    className='menu-bar-home' 
    onClick={handleMenuClick} 
    defaultSelectedKeys={[window.location.pathname]}>

        {/* <Menu.Item key="/homeContent" icon={<HomeOutlined />}>
            Home
        </Menu.Item> */}

        <Menu.Item key="/chatbot" icon={<MessageOutlined />}>
            NOIS Chat 
        </Menu.Item>
             
    </Menu>
  )
}

export default MenuList