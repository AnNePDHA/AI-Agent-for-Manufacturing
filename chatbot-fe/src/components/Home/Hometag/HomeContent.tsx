import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import './HomeContent.css'
import { MessageOutlined} from '@ant-design/icons'

// 9
interface ChatGPTProps {
  themeClassName: string;
}

const HomeContent: React.FC<ChatGPTProps> = ({ themeClassName }) => {
  let buttonType: "default" | "primary" = "primary";

  // const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [sizeChar, setSizeChar] = useState({ sizeHeader: 0, sizeWord: 0, sizeImage: 0, sizeMargin: 0, sizeButton:0, gap: ""});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setSizeChar({ sizeHeader: 9, sizeWord:  7, sizeImage: 1.0, sizeMargin: 10, sizeButton:190, gap: "small"});
      }
      else if (window.innerWidth >= 600){
        setSizeChar({ sizeHeader: 18, sizeWord: 14, sizeImage: 2.0, sizeMargin: 20, sizeButton:350, gap: "large"});
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  if (themeClassName === "dark-theme") {
    buttonType = "primary";
  } else if (themeClassName === "light-theme") {
    buttonType = "default";
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonKey = e.currentTarget.getAttribute('data-key');
    console.log('Button key:', buttonKey);
    window.location.href = buttonKey || '';
  };
  

  return (
    // <div className='home-button'>
      // <Flex vertical justify='center' align='center' style={{height:'100%'}}>
        <Flex gap={sizeChar.gap} vertical justify='center' align='center' style={{height:'100%'}}>
          <Button type={buttonType} block size={'large'} onClick={handleButtonClick} data-key="/chatbot" style={{width:sizeChar.sizeButton}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MessageOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader }}>Continue with NOIS GPT</div>
                {/* <div className="custom-text">Developing</div> */}
              </div>
            </div>
          </Button>
        </Flex>
      // </Flex>
    // </div>
    
  )
}

export default HomeContent