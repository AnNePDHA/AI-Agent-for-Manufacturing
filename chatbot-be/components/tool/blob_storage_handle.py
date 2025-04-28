# import os
# from azure.storage.blob import BlobServiceClient
# from dotenv import load_dotenv

# # Load the .env file
# load_dotenv()

# # Get the connection string and container name from .env
# connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
# container_name = os.getenv("CONTAINER_NAME")

# # Kết nối đến Blob Storage
# blob_service_client = BlobServiceClient.from_connection_string(connection_string)
# container_client = blob_service_client.get_container_client(container_name)

# def download_files(container_client, folder_path, local_download_folder):
#     """
#     Hàm tải về tất cả các file nằm trong folder_path của Blob Storage xuống thư mục local.
#     Cấu trúc thư mục được bảo toàn tương đối so với folder_path.
#     """
#     blobs = container_client.list_blobs(name_starts_with=folder_path)
#     for blob in blobs:
#         # Lấy đường dẫn tương đối của blob so với folder_path
#         relative_path = blob.name[len(folder_path):]
#         # Nếu relative_path không rỗng, đó là file (không phải folder ảo)
#         if relative_path and "." in relative_path and "history_log.csv" not in relative_path:
#             # Xây dựng đường dẫn file local, bảo toàn cấu trúc thư mục nếu có
#             local_file_path = os.path.join(local_download_folder, relative_path)
#             os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
#             print(f"Downloading {blob.name} to {local_file_path}")
#             blob_client = container_client.get_blob_client(blob)
#             with open(local_file_path, "wb") as file:
#                 file.write(blob_client.download_blob().readall())

