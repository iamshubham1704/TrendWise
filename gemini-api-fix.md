# Gemini API Model Error Fix

## Problem
You're encountering this error:
```
[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [404 Not Found] models/gemini-pro is not found for API version v1beta
```

## Root Cause
The `gemini-pro` model has been **deprecated and removed** from the Gemini API. You need to update to a currently supported model.

## Solution: Update Your Model Name

### Current Supported Models (as of January 2025)

| Model Name | Best For | Token Limit |
|------------|----------|-------------|
| `gemini-2.5-flash` | General use, cost-effective, high volume | 1M input / 65K output |
| `gemini-2.5-pro` | Complex reasoning, advanced coding | 1M input / 65K output |
| `gemini-2.0-flash` | Next-gen features, speed | 1M input / 8K output |
| `gemini-1.5-flash` | Stable, versatile | 1M input / 8K output |
| `gemini-1.5-pro` | Complex reasoning tasks | 2M input / 8K output |

### Recommended Replacements

- **Replace `gemini-pro` with `gemini-2.5-flash`** (recommended for most use cases)
- **For complex tasks:** Use `gemini-2.5-pro`
- **For stable production:** Use `gemini-1.5-flash`

## Code Examples

### JavaScript/TypeScript (Google AI SDK)
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// OLD (deprecated):
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// NEW (recommended):
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const result = await model.generateContent("Your prompt here");
console.log(result.response.text());
```

### Python
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

# OLD (deprecated):
# model = genai.GenerativeModel("gemini-pro")

# NEW (recommended):
model = genai.GenerativeModel("gemini-2.5-flash")

response = model.generate_content("Your prompt here")
print(response.text)
```

### cURL/REST API
```bash
# OLD (deprecated):
# curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent

# NEW (recommended):
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Your prompt here"
      }]
    }]
  }'
```

## Migration Steps

1. **Find all references** to `gemini-pro` in your codebase
2. **Replace with** `gemini-2.5-flash` (or your preferred model)
3. **Test your integration** with the new model
4. **Update environment variables** if you store the model name separately

## Common File Locations to Check

- Configuration files (`.env`, `config.js`, etc.)
- API service files
- Component files making AI calls
- Environment variable definitions
- Docker files or deployment configs

## Additional Notes

- **API Key:** Your existing Gemini API key will work with the new models
- **Pricing:** Check Google AI pricing as different models have different costs
- **Features:** Newer models like `gemini-2.5-flash` have improved capabilities
- **Rate Limits:** May vary between models

## Model Selection Guide

### Use `gemini-2.5-flash` for:
- General content generation
- High-volume applications
- Cost-sensitive projects
- Most production applications

### Use `gemini-2.5-pro` for:
- Complex reasoning tasks
- Advanced coding assistance
- Large document analysis
- Research and analysis tasks

### Use `gemini-1.5-flash` for:
- Stable production environments
- When you need proven reliability
- Long-context tasks (up to 1M tokens)

## Verification

To verify your fix worked:

1. **Run your application** and check for the 404 error
2. **Test a simple API call** with the new model
3. **Monitor API response times** (newer models may be faster)
4. **Check your usage dashboard** in Google AI Studio

## Getting Current Model List

You can always get the latest available models using:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=$GEMINI_API_KEY"
```

This will return all currently available models and their capabilities.