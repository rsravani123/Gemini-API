import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load API key from .env
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ Missing Gemini API Key in .env');
  process.exit(1);
}

// Function to call Gemini API
async function askGemini(question) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: question
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('✅ Gemini Response:', data.candidates[0].content.parts[0].text);
    } else {
      console.error('❌ No valid response:', JSON.stringify(data, null, 2));
    }

  } catch (err) {
    console.error('❌ API call failed:', err);
  }
}

// Example usage
askGemini('What is Java?');
