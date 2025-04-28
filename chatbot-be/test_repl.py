import pandas as pd

# Load the CSV file
data_path = './data/CSV_Excel/Ecommerce_Consumer_Behavior_Analysis_Data.csv'
data = pd.read_csv(data_path)

# Display the first few rows and columns for understanding the structure of the dataset
print(data.head())
print(data.columns)