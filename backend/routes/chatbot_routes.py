import os
import json
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from groq import Groq

from database.db import get_db_connection

# Loads GROQ_API_KEY from backend/.env (gitignored - each dev sets their own)
load_dotenv()

chatbot_bp = Blueprint("chatbot", __name__)

GROQ_MODEL = "llama-3.3-70b-versatile"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Don't crash the whole Flask app if the key isn't set yet - just disable the chatbot.
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None


def classify_message(user_message):
    """
    Ask Groq to classify what the user wants AND pull out a medicine name.
    Returns a dict: {"intent": "availability" | "general", "medicine_name": str|null}

    - "availability": user is asking whether/where a medicine is in stock
      (e.g. "is paracetamol available?", "where can I get amoxicillin?")
    - "general": anything else, including questions about what a medicine
      is used for, side effects, dosage, greetings, or unrelated chat.
      These should be answered directly, not routed through the stock table.
    """
    system_prompt = (
        "You classify a user's message on a medicine availability finder website. "
        "Respond ONLY with strict JSON, nothing else, in this exact form: "
        '{"intent": "availability", "medicine_name": "paracetamol"} '
        "Rules:\n"
        '- intent is "availability" ONLY if the user is asking whether a medicine '
        "is in stock, where to find it, or how to get/reserve it.\n"
        '- intent is "general" for anything else, including questions about what '
        "a medicine is used for, its side effects, dosage, general chit-chat, or "
        "greetings.\n"
        "- medicine_name is the medicine mentioned (lowercase), or null if none."
    )

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        temperature=0,
    )

    raw = response.choices[0].message.content.strip()

    try:
        parsed = json.loads(raw)
        intent = parsed.get("intent") if parsed.get("intent") in ("availability", "general") else "general"
        return intent, parsed.get("medicine_name")
    except (json.JSONDecodeError, AttributeError):
        return "general", None


def query_stock_for_medicine(medicine_name):
    """Same join pattern as search_routes.py, kept consistent with existing code."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            m.medicine_name,
            p.pharmacy_name,
            p.address,
            p.phone,
            s.quantity
        FROM stock s
        JOIN medicines m ON s.medicine_id = m.medicine_id
        JOIN pharmacies p ON s.pharmacy_id = p.pharmacy_id
        WHERE m.medicine_name LIKE %s
    """

    cursor.execute(query, ("%" + medicine_name + "%",))
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return results


def build_reply(user_message, intent, medicine_name, results):
    """Turn intent + DB results (if any) into a friendly reply."""
    if intent == "general":
        system_prompt = (
            "You are a friendly assistant on a medicine availability finder website. "
            "Answer the user's question directly and helpfully in 2-3 sentences. "
            "You can explain what a medicine is generally used for, but always add "
            "a brief reminder to consult a pharmacist or doctor for medical advice. "
            "You have no access to real-time stock data for this reply - only answer "
            "the general question asked."
        )
        context = user_message
    elif medicine_name is None:
        system_prompt = (
            "You are a friendly assistant on a medicine availability finder website. "
            "The user seems to be asking about availability but didn't name a "
            "medicine. Ask them which medicine they're looking for."
        )
        context = user_message
    elif not results:
        system_prompt = (
            "You are a friendly assistant on a medicine availability finder website. "
            "No pharmacies currently have this medicine in stock. Tell the user "
            "briefly and kindly, without inventing alternatives."
        )
        context = f"Medicine searched: {medicine_name}"
    else:
        system_prompt = (
            "You are a friendly assistant on a medicine availability finder website. "
            "Summarize these pharmacy stock results for the user in a short, clear, "
            "conversational way. Mention pharmacy names, addresses, and quantities."
        )
        context = json.dumps(results)

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": context},
        ],
        temperature=0.4,
    )

    return response.choices[0].message.content.strip()


@chatbot_bp.route("/chatbot/query", methods=["POST"])
def chatbot_query():
    if client is None:
        return jsonify({
            "reply": "Chatbot is not configured yet (missing GROQ_API_KEY in backend/.env).",
            "results": []
        }), 503

    data = request.get_json(silent=True) or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please type a message.", "results": []}), 400

    intent, medicine_name = classify_message(user_message)

    results = query_stock_for_medicine(medicine_name) if (intent == "availability" and medicine_name) else []
    reply = build_reply(user_message, intent, medicine_name, results)

    return jsonify({"reply": reply, "results": results})