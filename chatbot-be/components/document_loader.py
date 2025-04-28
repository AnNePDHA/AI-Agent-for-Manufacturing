# from pathlib import Path
# from typing import List
# import faiss
# from langchain_openai import AzureOpenAIEmbeddings
# from langchain_core.documents import Document
# from langchain_community.vectorstores import FAISS
# from langchain_community.docstore.in_memory import InMemoryDocstore
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from tqdm import tqdm


# class DocumentLoader:
#     """Load documents from a folder and upload them to VectorStore"""

#     def __init__(self, embeddings: AzureOpenAIEmbeddings, folder_path: str):
#         """
#         Constructor for DocumentLoader.

#         Args:
#             embeddings (AzureOpenAIEmbeddings): embeddings to use for encoding documents
#             folder_path (str): path to the folder containing documents to load and upload
#         """
#         self.embeddings = embeddings
#         self.folder_path = folder_path
#         self.index = faiss.IndexFlatL2(len(self.embeddings.embed_query("hello world")))

#     def load_documents_from_folder(self) -> List[Document]:
#         """Load documents from a folder"""
#         documents = []  # List holding all the documents
#         splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=32, length_function=len)

#         # Iterate over all files in the directory with a progress bar
#         for file_path in tqdm(Path(self.folder_path).glob("**/*"), desc="Loading files"):
#             if file_path.is_file():

#                 # Save source to a txt file if it's not already present
#                 source_file_path = Path("./data/vectorstore_source/vecvectorstore_source.txt")
#                 source_file_path.parent.mkdir(parents=True, exist_ok=True)
#                 source_file_path.touch(exist_ok=True)
#                 with open(source_file_path, "r+", encoding="utf-8") as source_file:
#                     existing_sources = source_file.read().splitlines()
#                     if file_path.name not in existing_sources:
#                         source_file.write(file_path.name + "\n")

#                 with open(file_path, "r", encoding="utf-8", errors="replace") as file:
#                     content_str = file.read()  # Read the content of the file

#                     # Split text into chunks
#                     for i, chunk in enumerate(splitter.split_text(content_str)):
#                         document_id = f"{file_path.name}_{i}"
#                         documents.append(
#                             Document(
#                                 page_content=chunk,
#                                 metadata={"source": file_path.name, "document_ID": document_id},
#                             )
#                         )
#         return documents

#     def get_vector_store(self) -> FAISS:
#         """Create and return a vector store by loading documents"""
#         documents = self.load_documents_from_folder()
        
#         vector_store = FAISS(
#             embedding_function=self.embeddings,
#             index=self.index,
#             docstore=InMemoryDocstore(),
#             index_to_docstore_id={},
#         )
#         ids = [doc.metadata["document_ID"] for doc in documents]
#         vector_store.add_documents(documents=documents, ids=ids)
#         return vector_store

