// Lightweight Gemini client for browser use
// Exposes: geminiClient.generateContent({ apiKey, model, userText, systemText })

const DEFAULT_ENDPOINT_BASE = 'https://generativelanguage.googleapis.com/v1beta';

function buildGeminiEndpoint(model, apiKey) {
	const encodedModel = encodeURIComponent(model);
	return `${DEFAULT_ENDPOINT_BASE}/models/${encodedModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
}

async function callGemini({ apiKey, model, userText, systemText }) {
	if (!apiKey) {
		throw new Error('Missing Gemini API key. Add it in Settings.');
	}
	if (!model) {
		throw new Error('Missing Gemini model.');
	}

	// Simple prompt construction: prepend systemText to userText for widest compatibility
	const promptText = [systemText?.trim(), userText?.trim()].filter(Boolean).join('\n\n');

	const endpoint = buildGeminiEndpoint(model, apiKey);
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contents: [
				{
					role: 'user',
					parts: [{ text: promptText }]
				}
			]
		})
	});

	if (!response.ok) {
		let details = '';
		try {
			const errJson = await response.json();
			details = errJson?.error?.message || JSON.stringify(errJson);
		} catch (_) {
			// ignore parse failure
		}
		throw new Error(`Gemini request failed: ${response.status} ${response.statusText}${details ? ` - ${details}` : ''}`);
	}

	const data = await response.json();
	const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
	if (!text) {
		throw new Error('Gemini returned no text.');
	}
	return text;
}

export const geminiClient = {
	async generateContent({ apiKey, model = 'gemini-1.5-flash', userText, systemText }) {
		try {
			return await callGemini({ apiKey, model, userText, systemText });
		} catch (err) {
			// Surface a clean error message to UI
			throw new Error(err?.message || 'Failed to generate with Gemini');
		}
	}
};

export default geminiClient;





