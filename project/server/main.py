
import os
import os
import sys
import traceback
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import openai
from supabase import create_client


env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../.env'))
load_dotenv(dotenv_path=env_path)
NVIDIA_API_KEY = os.getenv('NGC_NVIDIA_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL', 'https://integrate.api.nvidia.com/v1')
OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'qwen/qwen3-next-80b-a3b-instruct')
OPENAI_PROMPT = os.getenv('OPENAI_PROMPT', 'You are a helpful therapy chatbot.')
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Setup OpenAI client for NVIDIA API
openai_client = openai.OpenAI(
    base_url=OPENAI_BASE_URL,
    api_key=OPENAI_API_KEY
)


class ChatRequest(BaseModel):
    message: str

class RegisterUser(BaseModel):
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/register")
def register(user: RegisterUser):
    try:
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password
        })
        return {"message": "User registered successfully", "data": response}
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(user: LoginUser):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })
        return {"message": "Login successful", "data": response}
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def root():
    return {"message": "Therapy chatbot backend is running."}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    async def stream_response():
            sent = False
            try:
                completion = openai_client.chat.completions.create(
                    model=OPENAI_MODEL,
                    messages=[
                        {"role": "system", "content": OPENAI_PROMPT},
                        {"role": "user", "content": request.message}
                    ],
                    temperature=0.6,
                    top_p=0.7,
                    max_tokens=4096,
                    stream=True
                )
                for chunk in completion:
                    if chunk.choices[0].delta.content:
                        yield chunk.choices[0].delta.content
                        sent = True
            except Exception as e:
                print("[ERROR] Exception in /chat endpoint:", file=sys.stderr)
                traceback.print_exc()
                yield f"Sorry, there was an error connecting to the AI service. ({str(e)})"
                sent = True
            if not sent:
                yield "Sorry, no response."
    return StreamingResponse(stream_response(), media_type="text/plain")
