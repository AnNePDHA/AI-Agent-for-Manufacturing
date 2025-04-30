# SmartFactory AI Assistant
The SmartFactory AI Assistant is a smart virtual assistant designed to assist factory workers, maintenance teams, and operational engineers by simplifying access to manufacturing data and maintenance records.
It leverages large language models (LLMs) to understand user queries, interact with manufacturing databases, and deliver precise information, helping users make better decisions and streamline operations.

## Key Features
**1. Cloud-based Deployment:** The AI Agent backend is hosted on Azure App Service, ensuring scalable, secure, and flexible deployment across manufacturing environments.

**2. Custom LLM Development:** A tailored chatbot model is built and fine-tuned on Azure AI Foundry, optimized specifically for manufacturing support tasks, database interaction, and predictive maintenance queries.

**3. Agent Architecture via LangChain:** Integrates open-source LangChain to orchestrate interactions between the AI model and external data sources, enabling complex tool usage like SQL querying, validation, and data analysis.

**4. Predictive Maintenance Support:** Specialized tools for interacting with the PredictiveMaintenance_history table to help users track machine conditions and historical maintenance activities.

**5. Knowledge-Based Assistance:** Provides contextual, data-backed answers without the need for real-time system integration, focusing on enhancing users’ understanding of historical and operational data.

## Use cases

- **Query Data:** Users can ask natural language questions (e.g., "Which machines had critical alarms?") that are automatically converted into SQL queries to retrieve relevant data.
- **Check SQL Queries:** Users can submit SQL queries for validation and correction to ensure syntactical and logical accuracy before execution.
- **View Table Structure:** The Assistant can display the schema (column names, data types) and sample records of selected tables for better database understanding.
- **Analyze Data:** Provides insights and explanations for patterns or anomalies in manufacturing data, such as downtime trends, maintenance cycles, or production irregularities.
- **Support Predictive Maintenance:** Enables users to access and analyze the PredictiveMaintenance_history table, offering insights that can improve maintenance scheduling and reduce machine downtime.

## Workflow Diagram
![Biểu đồ không có tiêu đề drawio (2)](https://github.com/user-attachments/assets/e9f4630e-e71a-429b-aa96-1a350661b1fc)

## Technical Explanation
The SmartFactory AI Assistant system architecture is structured around several key technical components and processing stages:

**1. Upload Documentation / Connect Data Source**
- Users or system administrators can upload documents (formats such as PDF, DOCX, PPTX) to a designated Azure Storage location.
- Alternatively, the system can connect directly to a SQL database containing manufacturing operational data, maintenance history, and predictive maintenance records.

**2. LangChain Integration**
- LangChain serves as the orchestration layer that links the fine-tuned LLM model with the processed data

**3. Answer Generation**
- For each user question, if it's a knowledge-based query -> perform vector search on uploaded documents. If it's a structured data query → translate natural language into an SQL query.
- The Azure AI Foundry fine-tuned model processes prompts or SQL queries.
- The system returns a clear, user-friendly answer based on document content or database results.

## Getting Started
### Prerequisites
- Python 3.10+
- Nodejs 20+
- Azure subscription
  
### Front-end Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/AnNePDHA/SmartFactory-AI-Assistant
   cd SmartFactory-AI-Assistant
   ```
2. Navigate to the front-end directory:
   ```bash
   cd chatbot-fe
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Runs the app in the development mode:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Back-end Setup
1. Navigate to the back-end directory:
   ```bash
   cd chatbot-be
   ```
2. Install requirements.txt:
   ```bash
   pip install -r  requirements.txt
   ```
3. Make sure you have Poetry installed:
   ```bash
   pip install poetry
   ```
4. Set up the project dependencies, run:
   ```bash
   poetry lock
   ```
   and then:
   ```bash
   poetry install
   ```
5. Running the application:
   ```bash
   python app.py
   ```
6. The server will start locally and be exposed on port 5000

### Connecting to Azure OpenAI
For full functionality, SmartFactory AI Assistant requires a connection to Azure  services:

1. Create an Azure AI Foundry resource in your Azure portal
2. Deploy a model (GPT-4o recommended for best results)
3. Copy the endpoint, deployment name, and API key
4. Create a `.env` file and copy the necessary configurations from `.env.example`
5. Update the `.env` file with these credentials

### Language & Framework

- [x] Python
- [ ] C#
- [ ] Java
- [x] JavaScript/TypeScript
- [ ] Microsoft Copilot Studio
- [ ] Microsoft 365 Agents SDK
- [x] Azure AI Agent Service

### Project Video

https://drive.google.com/file/d/1CZmfky3Xgo69jFjx14my9qm9Rq-zTwaW/view?usp=sharing
