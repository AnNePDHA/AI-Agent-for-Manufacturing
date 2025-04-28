from .session_verify import create_session_factory
from .prompt_templates import prompt
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.agents.format_scratchpad.openai_tools import format_to_openai_tool_messages
from langchain.agents import AgentExecutor
from langchain.agents.output_parsers import ToolsAgentOutputParser
from langchain_core.utils.function_calling import convert_to_openai_tool
from .tools_langchain import *
from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from .table_schema import *

# Load the environment variables
load_dotenv()

# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.0-flash",
#     temperature=0,
#     streaming=True,
#     # other params...
# )

# Choose the LLM model (test commit)

# AZURE_OPENAI_API_KEY=3LFZXnEMcsbutnOP0kWoohviFu2QasP4BnZPaYdKyQyH1A7pX8auJQQJ99BCACHrzpqXJ3w3AAABACOGAVtL
# OPENAI_API_VERSION=2025-01-01-preview
# MODEL_NAME=gpt-4o
# AZURE_OPENAI_ENDPOINT=https://llm-fineturning.openai.azure.com

llm = AzureChatOpenAI(
    openai_api_type="azure",
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
    azure_endpoint = os.environ["AZURE_OPENAI_ENDPOINT"],
    openai_api_version = os.environ["OPENAI_API_VERSION"],
    model=os.environ["MODEL_NAME"],
    temperature=0.01,
    streaming=True
)

db = get_database()

sql_toolkit = SQLDatabaseToolkit(db=db, llm=llm)
sql_toolkit = sql_toolkit.get_tools()

tools = [ delete_all_history] + sql_toolkit

# Combine LLM with tools
llm_with_tools = llm.bind(tools=[convert_to_openai_tool(tool) for tool in tools])

# Agent Executor by LangChain
agent = (
    {
        "input": lambda x: x["input"],
        "agent_scratchpad": lambda x: format_to_openai_tool_messages(x["intermediate_steps"]),
        "chat_history": lambda x: x["chat_history"],

    }
    | prompt
    | llm_with_tools
    | ToolsAgentOutputParser()
)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

chain_with_history_and_agent = RunnableWithMessageHistory(
    agent_executor,
    create_session_factory("chat_histories"),
    input_messages_key="input",
    history_messages_key="chat_history",
)
