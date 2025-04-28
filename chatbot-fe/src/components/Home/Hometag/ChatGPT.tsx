import React from 'react';
import { useState, useRef } from 'react';
import './Chat.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput, 
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import { MessageDirection } from "@chatscope/use-chat";

const baseUrl = `https://roklive-chatbot-backend.azurewebsites.net`;
// const baseUrl = `http://127.0.0.1:5000/login`
// const baseUrl = `http://172.16.60.237:5000`;

interface MessageChat {
  message: string;
  direction: MessageDirection;
  sentTime?: string;
  sender: string;
  position: 0 | "normal" | 2 | 1 | "single" | "first" | "last" | 3;
  action?: () => void;
  isHtml?: boolean;
}

interface ChatGPTProps {
  themeClassName: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ themeClassName }) => {
  const [messages, setMessages] = useState<MessageChat[]>([
    {
      message: "Xin chào, NOIS Chat có thể giúp gì bạn hôm nay?",
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    },
    {
      message: "Phân tích các bản ghi gần nhất và xác định các máy có nguy cơ hỏng cao",
      sentTime: "just now",
      direction: MessageDirection.Outgoing,
      sender: "user",
      position: "normal",
      action: () => handleRecommendButtonClick("Phân tích các bản ghi gần nhất và xác định các máy có nguy cơ hỏng cao"),
    },
    {
      message: "Có tổng số bao nhiêu bản ghi cho dự đoán hỏng hóc?",
      sentTime: "just now",
      direction: MessageDirection.Outgoing,
      sender: "user",
      position: "normal",
      action: () => handleRecommendButtonClick("Có tổng số bao nhiêu bản ghi cho dự đoán hỏng hóc?"),
    },
    {
      message: "Các bản ghi mới nhất vào ngày hôm nay?",
      sentTime: "just now",
      direction: MessageDirection.Outgoing,
      sender: "user",
      position: "normal",
      action: () => handleRecommendButtonClick("Các bản ghi mới nhất vào ngày hôm nay?"),
    }
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecommend, setisRecommend] = useState<string>('need');
  const responseMessageRef = useRef<string>('');

  const replaceTablesWithHtml = (text: string): string => {
    const lines = text.split('\n');
    let result = '';
    let i = 0;
  
    while (i < lines.length) {
      if (isTableStart(lines, i)) {
        const tableLines = collectTableLines(lines, i);
        const htmlTable = convertToHtmlTable(tableLines);
        result += htmlTable;
        i += tableLines.length;
      } else {
        result += lines[i] + '\n';
        i++;
      }
    }
    return result.trim(); // Remove trailing newline for consistency
  };
  
  // Check if the current line marks the start of a table
  const isTableStart = (lines: string[], index: number): boolean => {
    if (index + 1 >= lines.length) return false;
    const line1 = lines[index].trim();
    const line2 = lines[index + 1].trim();
    // A table starts with a header row (e.g., | Header1 | Header2 |)
    // followed by a separator row (e.g., |---|---|)
    return line1.startsWith('|') && line2.startsWith('|') && line2.includes('---');
  };
  
  // Collect all lines that form a table
  const collectTableLines = (lines: string[], start: number): string[] => {
    const tableLines = [lines[start], lines[start + 1]]; // Header and separator
    let i = start + 2;
    // Continue collecting lines that start with '|' (data rows)
    while (i < lines.length && lines[i].trim().startsWith('|')) {
      tableLines.push(lines[i]);
      i++;
    }
    return tableLines;
  };
  
  // Convert markdown table lines to an HTML table
  const convertToHtmlTable = (tableLines: string[]): string => {
    // Parse header row, removing leading/trailing '|' and splitting by '|'
    const headerCells = tableLines[0].split('|').slice(1, -1).map(cell => cell.trim());
    // Parse data rows (skip header and separator)
    const dataRows = tableLines.slice(2).map(row => 
      row.split('|').slice(1, -1).map(cell => cell.trim())
    );
  
    // Build HTML table
    let html = '<table>\n<thead>\n<tr>';
    headerCells.forEach(cell => {
      html += `<th>${cell}</th>`;
    });
    html += '</tr>\n</thead>\n<tbody>';
    dataRows.forEach(row => {
      html += '\n<tr>';
      row.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '\n</tbody>\n</table>';
    return html;
  };

  const formatText = (text: string): string => {
    let formattedText = text;
  
    // Xử lý tiêu đề (headers)
    formattedText = formattedText.replace(/^#### (.+?)$/gm, '<h4>$1</h4>');
    formattedText = formattedText.replace(/^### (.+?)$/gm, '<h3>$1</h3>');
    formattedText = formattedText.replace(/^## (.+?)$/gm, '<h2>$1</h2>');
    formattedText = formattedText.replace(/^# (.+?)$/gm, '<h1>$1</h1>');
  
    // Xử lý in đậm (**text**)
    formattedText = formattedText.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  
    // Xử lý in nghiêng (*text*)
    formattedText = formattedText.replace(/\*(.+?)\*/g, '<i>$1</i>');
  
    // Xử lý inline code (`text`)
    formattedText = formattedText.replace(/(?<!`)`(?!`)(.+?)(?<!`)`(?!`)/g, '<code><b>$1</b></code>');

    const pattern = /(```|'''|""")([\s\S]*?)(\1)/g;
    let isFirstBlock = true;

    return formattedText.replace(pattern, (match) => {
      if (isFirstBlock) {
        isFirstBlock = false;
        return '';
      }
      return match;
    });

  };

// Hàm lấy ngày và giờ theo UTC+7 (múi giờ Việt Nam)
const getCurrentUTC7DateTime = () => {
  return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

const MessageContent: React.FC<{ message: MessageChat }> = ({ message }) => {
  if (message.isHtml) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: message.message }}
        className="html-message-content"
      />
    );
  }
  return <>{message.message}</>;
};

const processStreamedMessage = async (chatMessages: MessageChat[]) => {
  try {

    // Lấy ngày giờ hiện tại theo UTC+7
    const currentUTC7DateTime = getCurrentUTC7DateTime();
    
    // Lấy message cuối cùng
    const lastMessage = chatMessages[chatMessages.length - 1]?.message;
    // Nối chuỗi với thông tin UTC offset và thời gian UTC+7
    const messageWithTimeZoneInfo = `$[${currentUTC7DateTime}] ${lastMessage}`;

    // Gửi request đến server
    const response = await fetch(`${baseUrl}/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageWithTimeZoneInfo,
        session_id: localStorage.getItem("userSession"),
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is null");
    }

    // Khởi tạo response message
    responseMessageRef.current = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        setIsTyping(false);
        break;
      }

      // Thêm chunk vào chuỗi đã tích lũy
      const chunk = decoder.decode(value, { stream: true });
      responseMessageRef.current += chunk;

      // Xử lý table trước, sau đó định dạng markdown
      const textWithTables = replaceTablesWithHtml(responseMessageRef.current);
      const formattedText = formatText(textWithTables);

      // Cập nhật tin nhắn trên giao diện
      setMessages((prevMessages: MessageChat[]) => {
        const newMessages = [...prevMessages];
        const lastMessageIndex = newMessages.length - 1;

        if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].sender === "ChatGPT") {
          // Cập nhật tin nhắn của ChatGPT đã có
          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
            message: formattedText,
            isHtml: true,
          };
        } else {
          // Thêm tin nhắn mới
          newMessages.push({
            message: formattedText,
            sentTime: "just now",
            direction: MessageDirection.Incoming,
            sender: "ChatGPT",
            position: "normal",
            isHtml: true
          });
        }

        return newMessages;
      });
    }
  } catch (error) {
    console.error("Error:", error);
    setIsTyping(false);
  }
};
  const handleRecommendButtonClick = async (message: string) => {
    const newMessages: MessageChat[] = [
      {
        message: "Xin chào, NOIS Chat có thể giúp gì bạn hôm nay?",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: message,
        direction: MessageDirection.Outgoing,
        sentTime: "just now",
        sender: "user",
        position: "normal",
      }
    ];

    setMessages(newMessages);
    setIsTyping(true);
    await processStreamedMessage(newMessages);
    setisRecommend('noneed');
  };

  const handleSend = async (message: string) => {
    const newMessage: MessageChat = {
      message,
      direction: MessageDirection.Outgoing,
      sentTime: "just now",
      sender: "user",
      position: "normal",
    };

    let newMessages: MessageChat[];

    if (messages.length === 4 && messages[0].message === "Xin chào, NOIS Chat có thể giúp gì bạn hôm nay?") {
      setisRecommend('noneed');
      newMessages = [
        {
          message: "Xin chào, NOIS Chat có thể giúp gì bạn hôm nay?",
          sentTime: "just now",
          direction: MessageDirection.Incoming,
          sender: "ChatGPT",
          position: "normal",
        },
        newMessage
      ];
    } else {
      newMessages = [...messages, newMessage];
    }

    setMessages(newMessages);
    setIsTyping(true);
    await processStreamedMessage(newMessages);
  };

  return (
    <div className={`App ${themeClassName}-chat-root`}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            className={`${themeClassName}-incoming ${themeClassName}-${isRecommend}-outgoing ${themeClassName}-messagelist`}
            scrollBehavior="auto"
            typingIndicator={isTyping ? <TypingIndicator content="NOIS Chat đang suy nghĩ" /> : null}
          >
            {messages.map((message: MessageChat, i: number) => (
              <div key={i} style={{ display: 'block' }} onClick={message.action}>
                <Message model={{
                  ...message,
                  message: message.isHtml ? 
                    `<div class="html-message-content">${message.message}</div>` : 
                    message.message
                }} />
              </div>
            ))}
          </MessageList>
          <MessageInput 
            placeholder="Hãy hỏi gì đó ..." 
            activateAfterChange={true} 
            autoFocus={true} 
            onSend={handleSend} 
            attachButton={false} 
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatGPT;