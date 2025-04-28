import shutil
from langchain.agents import tool
from dotenv import load_dotenv
from langchain_community.utilities import SQLDatabase
from sqlalchemy import NullPool
from .table_schema import PredictiveMaintenance_history
import os


"""
### TOOLS ###
The following tools are available for use in the AI Agent. Each tool should be a function that takes input arguments and returns an output.\
The `@tool` decorator is used to define a function as a tool.
"""

load_dotenv()
path = os.getenv("PATH_SQL")


def get_database():
    db = SQLDatabase.from_uri(f"{path}",
                          sample_rows_in_table_info=5,
                          ignore_tables=[
                              "PredictiveMaintenance_results",
                              "uc1_long_term_history",
                              "uc1_short_term_history",
                              "Ecommerce_Consumer_Behavior",
                              "uc4_history",
                              "uc4_realtime",
                              "uc4_results",],

                          custom_table_info={  
                                "PredictiveMaintenance_history": f"{PredictiveMaintenance_history}",
                                },
                                                          engine_args={
                            #   "pool_size":5,
                            #   "max_overflow":10,
                            #   "pool_recycle": 3600,
                              "poolclass":NullPool,
                              }

                          )
    return db

@tool
def delete_all_history(keyword: str) -> str:
    """Delete history chat using the keyword matches as "wubba"."""
    folder_path = "./chat_histories"

    if not os.path.exists(folder_path):
        return f"Folder '{folder_path}' not exists."

    if not os.path.isdir(folder_path):
        return f"Path to '{folder_path}' isn't a folder."

    if keyword == "wubba":
        try:
            for file_name in os.listdir(folder_path):
                full_path = os.path.join(folder_path, file_name)
                if os.path.isfile(full_path):
                    os.remove(full_path)
                elif os.path.isdir(full_path):
                    shutil.rmtree(full_path)
            return f"All the files in '{folder_path}' has been deleted."
        except Exception as e:
            return f"There is something wrong: {e}"
    return "Keyword mismatch. Deletion not performed."

