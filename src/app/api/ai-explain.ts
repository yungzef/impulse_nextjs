import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // В реальному додатку тут буде запит до реального AI API
        // Це імітація з затримкою

        const { question, answers, correctIndex, explanation } = req.body;

        await new Promise(resolve => setTimeout(resolve, 1500));

        const aiResponse = `
AI Пояснення українською:

**Питання:** ${question}

**Правильна відповідь:** ${answers[correctIndex]}

**Детальне пояснення:**
${explanation || 'На основі навчальних матеріалів, правильна відповідь обирається тому що...'}

**Порада для запам'ятовування:**
Спробуйте асоціювати це питання з... У реальному житті це виглядає так...
    `;

        res.status(200).json({ explanation: aiResponse.trim() });
    } catch (error) {
        console.error('AI explanation error:', error);
        res.status(500).json({ error: 'Помилка отримання пояснення від AI' });
    }
}