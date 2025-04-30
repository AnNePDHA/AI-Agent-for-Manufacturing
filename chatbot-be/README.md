# 🧐 AI_Lord

An intelligent SQL management system for predictive maintenance ticket handling, built using the **LangChain** framework.

---

## 🚀 Installation

First, make sure you have [Poetry](https://python-poetry.org/docs/#installation) installed:

```bash
pip install poetry
```

---

## 📦 Adding & Installing Packages

To set up the project dependencies, run:

```bash
poetry lock
```

and then:

```bash
poetry install
```

---

## 🛠️ Running the Application

After installing the dependencies with Poetry:

1. Run the application:

    ```bash
    python app.py
    ```

2. The server will start locally and be exposed on **port 5000**.

---

## ⚙️ Environment Variables

Before running the project, **you must create a `.env` file**.

- The required environment variables are listed in `.env.example`.
- Create a `.env` file and copy the necessary configurations from `.env.example`.

---

## 📚 Frameworks & Technologies

- **LangChain** — for AI logic and chain management.
- **SQLAlchemy** — for interacting with the SQL database.
- **Flask** — to serve the backend API.

---

## 📁 Project Structure

```plaintext
AI_Lord/
│
├──components/  
|   ├─agent.py     //The main agent is in here!
|   ├─tools.py
│   ├ ...  
├── app.py          //For the restful api with Flask!
├── .env.example
├── README.md
├── pyproject.toml
├── ...
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---
