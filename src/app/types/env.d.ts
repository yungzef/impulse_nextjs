/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        TOKEN: string;
        // Добавь сюда другие переменные, если нужно
    }
}
