import asyncio, base64, os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()
OUT = "/app/frontend/public/assets"
os.makedirs(OUT, exist_ok=True)

PROMPT = (
    "Cinematic luxury hero artwork for a data analyst portfolio: deep obsidian-black background, "
    "elegant glowing golden particles connected by thin gold constellation lines forming an abstract "
    "data network, subtle golden bar-chart and line-chart silhouettes rising from the bottom, soft "
    "warm golden glow, premium minimal editorial style, wide landscape composition, no text, no watermark."
)

async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="hero-art", system_message="You generate images.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        with open(os.path.join(OUT, "hero-art.png"), "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print("saved hero-art.png")
    else:
        print("NO IMAGE", text[:120])

asyncio.run(main())
