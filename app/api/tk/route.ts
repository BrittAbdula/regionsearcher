import { NextRequest, NextResponse } from 'next/server';

// 模拟翻译 API（实际使用时替换为真实的翻译 API）
async function translateQuery(query: string, region: string, language: string) {
    // 这里应该是实际的翻译 API 调用
    const prompt = getTranslationPrompt(query, region, language);
    const translatedText = await callOpenAIAPI(prompt);
    return translatedText;
}

export async function POST(req: NextRequest) {
    
    try {
        const { searchInput, regions } = await req.json();

        // 对每个选中的区域进行翻译
        const translations = await Promise.all(
            regions.map(async (region: { id: string, region: string, language: string }) => {
                const translatedText = await translateQuery(searchInput, region.region, region.language);
                return {
                    id: region.id,
                    query: translatedText
                };
            })
        );

        return NextResponse.json({ translations });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "translate error." }, { status: 500 });
    }
}

function getTranslationPrompt(query: string, region: string, language: string) {
    const encodedQuery = `\`\`\`\n${query}\n\`\`\``;

    return `I want to know how people in ${region} search for my original query in ${language}. Your task is to translate. Your task is to help Translate the following search query into ${language} for the ${region} region.
    Original query is enclosed between triple backticks:
    ${encodedQuery}

    Instructions:
    1. Provide only the translated query, without any explanations or additional text.
    2. Maintain the original intent and meaning of the query.
    3. Use language and terminology appropriate for ${region} and ${language}.
    4. Consider local search patterns and popular phrases in ${region}.
    5. Optimize the translation for local search engines in ${region}.
    6. Keep the translation concise and to the point.
    7. If the original query contains proper nouns or brand names, handle them appropriately for ${region}.
    8. Do not add any punctuation or formatting unless it was present in the original query.

    Translated query:`;
}

const apiKey = process.env.OPENAI_API_KEY!

async function callOpenAIAPI(prompt: string) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a precise and accurate translator for search queries. Your translations are concise and optimized for the target region and language." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 50,
                n: 1,
                temperature: 0.3, // Lower temperature for more consistent outputs
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}
