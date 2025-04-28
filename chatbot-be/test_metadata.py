from components.agent import chain_with_history_and_agent

result = chain_with_history_and_agent.invoke({"input": "how many tickets today??"}, {"configurable": {"session_id": "test"}})

print(result)