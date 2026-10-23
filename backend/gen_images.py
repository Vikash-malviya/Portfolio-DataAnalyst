import asyncio, base64, os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()
OUT = "/app/frontend/public/assets"
os.makedirs(OUT, exist_ok=True)

JOBS = [
    ("project-retail.png", "A realistic screenshot of a professional Microsoft Power BI dashboard in dark mode analysing retail sales performance. Layout: top row of KPI cards (Total Revenue, YoY Growth %, Average Order Value, Units Sold), a bar chart of sales by product category, a line/area chart of monthly revenue trend, a filled map of regional sales, left slicer panel. Obsidian-black background, gold and soft white accents, crisp modern BI interface, sharp readable labels, no watermark."),
    ("project-churn.png", "A realistic screenshot of a professional Microsoft Power BI dashboard in dark mode for telecom customer churn analysis. Layout: KPI cards (Churn Rate %, Accuracy, Precision, Recall), donut chart of churn split, bar charts of churn by contract type and tenure group, scatter plot of monthly charges vs total charges coloured by churn, left slicer panel. Obsidian-black background, gold and soft white accents, crisp modern BI interface, sharp readable labels, no watermark."),
    ("project-stock.png", "A realistic screenshot of a professional Microsoft Power BI dashboard in dark mode for stock market analysis. Layout: candlestick chart of daily prices, line chart of closing price trend with moving averages, KPI tiles (Volume, Daily Change %, 52-week High/Low), bar chart of volume by month, left slicer panel with ticker filter. Obsidian-black background, gold and soft white accents, crisp modern BI interface, sharp readable labels, no watermark."),
]

async def gen(name, prompt):
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=f"img-{name}", system_message="You generate images.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        with open(os.path.join(OUT, name), "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print("saved", name, len(images))
    else:
        print("NO IMAGE for", name, text[:120])

async def main():
    for name, prompt in JOBS:
        try:
            await gen(name, prompt)
        except Exception as e:
            print("FAILED", name, str(e)[:200])

asyncio.run(main())
