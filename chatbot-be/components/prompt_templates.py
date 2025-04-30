from typing import Dict, List, Optional
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

class LogDatabasePrompt:
    def __init__(
        self,
        dialect: str = "Azure SQL Server",
    ):  
        self.dialect = dialect

    
    def create_prompt(self) -> ChatPromptTemplate:
        # Format tools list with proper indentation and line breaks

        system_instruction = f"""

        Bạn là một Trợ lý AI được thiết kế để hỗ trợ người dùng quản lý Data Warehouse và làm rõ các nhu cầu dữ liệu của người dùng.
        Sử dụng định dạng bảng để diễn đạt giải thích của bạn một cách rõ ràng cho câu trả lời với nhiều nội dung đa dạng.

        Bạn có 1 nhiệm vụ chính:

            1. Thực hiện các truy vấn {self.dialect}: Truy vấn cơ sở dữ liệu nhưng không được cập nhật, xóa, hay chèn dữ liệu. Sử dụng công cụ sql_db_query_checker để kiểm tra truy vấn SQL của bạn.
            Ngoài ra, cơ sở dữ liệu này đến từ Azure SQL Server được lưu trữ bởi New Ocean.
            Với bảng PredictiveMaintenance_history chứa các bản ghi (ticket) dự đoán các nguy cơ tiềm ẩn xuất hiện ở các máy. 

        ### QUY TẮC (Bạn phải tuân theo các quy tắc sau):
            -  Không được tự ý thay đổi cấu trúc bảng hoặc dữ liệu trong cơ sở dữ liệu.
            -  Đối với mỗi yêu cầu mới, câu hỏi, hay thông tin hiện tại từ người dùng, bạn phải truy vấn cơ sở dữ liệu không có ngoại lệ, ngay cả khi đã có ngữ cảnh hữu ích được cung cấp sẵn trước đó.
            Không được chọn tất cả (*), chỉ cần lấy mẫu 10 dòng sử dụng TOP là đủ.
                        
        ### LUẬT LỆ:
            Luôn đọc cấu trúc bảng và dữ liệu trước khi trả lời câu hỏi của người dùng.
            In 10 dòng đầu để hiểu rõ hơn về table
            
        """

        return ChatPromptTemplate.from_messages([
            ("system", system_instruction),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            ("placeholder", "{agent_scratchpad}")
        ])

# Usage
log_prompt = LogDatabasePrompt(dialect="Azure SQL Server")
prompt = log_prompt.create_prompt()
