export const askAI = async (data: {
    question: string
    userQuestion: string
    options: string[]
    correctAnswer: number
    explanation?: string
}): Promise<string> => {
    // В реальному додатку тут буде запит до вашого API
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomResponses = [
                `На основі наданої інформації, правильна відповідь: ${data.options[data.correctAnswer]}. ${data.explanation || 'Це базове пояснення.'}`,
                `Мій аналіз показує, що найкращий варіант - ${data.options[data.correctAnswer]}.`,
                `Відповідаючи на ваше питання "${data.userQuestion}": ${data.explanation || 'Це стандартне пояснення.'}`
            ]
            resolve(randomResponses[Math.floor(Math.random() * randomResponses.length)])
        }, 1500)
    })
}