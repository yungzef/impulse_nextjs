/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        TOKEN: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        NEXT_PUBLIC_URL: string;
        // Добавь сюда другие переменные, если нужно
    }
}
