import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import asyncio
from hypercorn.config import Config
from hypercorn.asyncio import serve
from components.agent import chain_with_history_and_agent
import re

# Load the .env file
load_dotenv()
 
app = Flask(__name__)
CORS(app, supports_credentials=True)
 
# Default API
@app.route('/')
def index():
    return "success!"
  
# Login
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]
 
    if username == "":
        return jsonify({"error": "Please enter your username"}), 401
    elif username != os.getenv('USERNAME_APP'):
        return jsonify({"error": "Invalid username"}), 402
    elif password == "":
        return jsonify({"error": "Please enter your password"}), 403
    elif password != os.getenv('PASSWORD_APP'):
        return jsonify({"error": "Invalid password"}), 404
   
    session_id = request.headers.get('Authorization')
    print(session_id)
 
    return jsonify({
        "id": username,
        "email": password
    })
 
@app.route("/chatbot", methods=["GET", "POST"])
async def chatbot():
    msg = request.get_json()

    msg_input = re.sub(r'<[^>]*>', '', msg.get("message", ""))
    session_id = msg.get("session_id", "")

    async def generate_async():
        async for chunk in chain_with_history_and_agent.astream_events({"input": msg_input}, {"configurable": {"session_id": "1123123"}}, version="v2"):
            content = chunk['data']
            if chunk.get('event') == 'on_chat_model_stream':
                data = chunk.get('data', {}).get('chunk', None)

                if data and hasattr(data, 'content'):
                    content = data.content
                    yield f"{content}"

    def generate_sync():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            async_gen = generate_async()
            while True:
                yield loop.run_until_complete(async_gen.__anext__())
        except StopAsyncIteration:
            pass
        finally:
            loop.close()

    def update_yield():
        for response in generate_sync():
            yield response

    return Response(update_yield(), content_type="text/plain")

 
if __name__ == "__main__":
    config = Config()
    config.bind = ["0.0.0.0:5000"]
    config.keep_alive_max_requests = 1000
    config.worker_class = "asyncio"
    asyncio.run(serve(app, config))