import asyncio, base64, os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()
OUT = "/app/frontend/public/assets"

PROMPT = (
    "Equirectangular world map texture for a 3D globe, exact 2:1 aspect ratio: pure black oceans, "
    "continents drawn as dense clusters of small glowing golden dots with thin golden dot-grid lines, "
    "subtle warm gold glow along coastlines, faint cool blue shimmer in a few ocean regions, "
    "flat map projection, accurate continent shapes (Africa, Europe, Asia, Americas, Australia), "
    "no text, no labels, no watermark, seamless left-right edges."
)

async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="earth-tex", system_message="You generate images.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        with open(os.path.join(OUT, "earth-texture.png"), "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print("saved earth-texture.png")
    else:
        print("NO IMAGE", text[:120])

asyncio.run(main())
