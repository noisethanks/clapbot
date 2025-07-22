from fastapi import FastAPI, Request, Query
from pydantic import BaseModel
from transformers import pipeline

class TextPayload(BaseModel):
    text: str

app = FastAPI()
classifier = pipeline("text-classification", model="unitary/toxic-bert")

threshold = 0.8
class ModerationRequest(BaseModel):
    text: str
@app.post("/moderate")
def moderate(request: ModerationRequest):
    text = request.text
    result = classifier(text)
    print(f"Classification result: {result}")

            
    if result[0]['label'] == 'toxic' and result[0]['score'] >= threshold:
        return {"ok": False, "reason": f"Toxicity score {result[0]['score']:.2f} exceeded threshold"}
    return { "ok": True }
