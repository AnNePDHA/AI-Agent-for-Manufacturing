"""
This file contains the code for the Wiki Assistant tool.
The Wiki Assistant takes a page content and a request as input,
and returns the corrected page content according to the request.
The tool uses the GPT-4O-Mini model provided by Azure OpenAI.
"""
 
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import AzureChatOpenAI
import dotenv
import os

# Load the environment variables
dotenv.load_dotenv()
 
# Set up the model
model = AzureChatOpenAI(
    azure_endpoint = 'https://llm-fineturning.openai.azure.com/',
    openai_api_version = "2025-01-01-preview",
    azure_deployment="gpt-4o",
    temperature=1,
)
 
# Set up the prompt template
prompt_template = ChatPromptTemplate.from_messages(
    [
        ("assistant", "You must make sure the code are included print statements, if not, add them in the code."),
        ("user", "Check the print statements in the code, here is the code: {code}"),
    ]
)
 
 
chain = prompt_template | model
 
 