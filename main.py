from flask import Flask, render_template, request, jsonify
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

# Initialize Flask app
app = Flask(__name__)

# Define a simple template for conversation
template = """
The following is a conversation between a user and an AI assistant. The AI assistant is helpful, creative, clever, and very friendly.

User: {question}
AI:"""

# Initialize the Ollama model
model = OllamaLLM(model="llama3.2:1b")

# Create a prompt template for conversation
prompt = ChatPromptTemplate.from_template(template)

# Define the LLMChain to handle prompt and model interaction
chain = prompt | model

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Define the /chat endpoint to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')
        result = chain.invoke({"question": user_input})
        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
