import React, { useEffect, useState } from 'react';
import { Button, Layout, theme, Tooltip } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import Logo from './Hometag/Logo';
import MenuList from './Hometag/MenuList';
import "./Home.css";
import ToggleThemeButton from './Hometag/ToggleThemeButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"

import ChatGPT from './Hometag/ChatGPT';
import HomeContent from './Hometag/HomeContent'

const { Header, Sider} =  Layout;

const Home: React.FC = () => {
    const [darkTheme, setdarkTheme] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [oldPath, setOldPath] = useState("/")
    const navigate = useNavigate();

    console.log("Home")
    
    const location = useLocation();
    const currentRoute = location.pathname;

    if (oldPath != currentRoute){
      setOldPath(currentRoute)
    }
    
    const [currentContent, setCurrentContent] = useState(currentRoute === '/' ? '/homeContent' : currentRoute);

    const ToggleTheme = () => {
        setdarkTheme(!darkTheme)
    };
    

    const {
        token: {colorBgContainer},
    } =  theme.useToken()

    const Logout = () => {
      console.log("logout")    
      // Perform logout actions
      localStorage.setItem('isLoggedIn', "false");
    
      // Redirect to the /login page
      navigate('/login');
    };

    
    
    const handleMenuClick = (key: string) => {
        setCurrentContent(key);
        navigate(key);
      };

    const themeClassName = darkTheme ? 'dark-theme' : 'light-theme';
  
    useEffect(() => {
        function handleResize() {    
          if (window.innerWidth < 600) {
            setCollapsed(true);
          }
          else if (window.innerWidth >= 600) {
            setCollapsed(false);
          }
        }
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <Layout className={themeClassName} >
            <Sider collapsed={collapsed} 
            collapsible
            trigger={null}
            theme={darkTheme ? 'dark' : 'light'} 
            className={`sidebar-${themeClassName}`}>
                <Logo />
                <MenuList darkTheme={darkTheme} onClick={handleMenuClick} collapsed={collapsed} />
                <ToggleThemeButton darkTheme={darkTheme} toggleTheme={ToggleTheme}/>
            </Sider>

            <Layout className={themeClassName}>
                <Header className={`taskbar-${themeClassName} ${themeClassName}`} style={{padding: 20, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                    type='text' 
                    className='toggle'
                    onClick={() => setCollapsed(!collapsed)}
                    icon={collapsed ? <MenuUnfoldOutlined className={themeClassName} /> : <MenuFoldOutlined className={themeClassName} />}

                />

                <Button 
                    // type='text' 
                    // className='toggle'
                    onClick={() => Logout()}
                    icon={collapsed ? <LogoutOutlined className={themeClassName} /> : <LogoutOutlined className={themeClassName} />}
                />
              
                </Header>

                {currentContent === '/homeContent' && <HomeContent themeClassName={themeClassName}/>}
                {currentContent === '/chatbot' && <ChatGPT themeClassName={themeClassName}/>}
                
            </Layout>
        </Layout>

    );
}


export default Home;