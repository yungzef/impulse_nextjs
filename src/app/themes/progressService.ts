export const saveProgress = (progress: {
    testId: string
    currentIndex: number
    answeredQuestions: Record<number, boolean>
}) => {
    // В реальному додатку тут буде збереження на сервер або в localStorage
    localStorage.setItem(`progress_${progress.testId}`, JSON.stringify(progress))
}

export const loadProgress = (testId: string) => {
    const data = localStorage.getItem(`progress_${testId}`)
    return data ? JSON.parse(data) : null
}