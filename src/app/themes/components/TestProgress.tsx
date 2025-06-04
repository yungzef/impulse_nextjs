"use client";

import { TestConfig } from '@/app/themes/types';
import {Star, StarOff} from "lucide-react";

export default function TestProgress({ current, elapsedSeconds, total, config }: {
    current: number;
    elapsedSeconds: number;
    total: number;
    config: TestConfig;
}) {
    const percent = Math.round((current / total) * 100);

    const remainingSeconds = Math.max(0, 20 * 60 - elapsedSeconds);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <div>
            <div className="flex justify-between mb-1">
                {config.mode === "timed" && (
                    <span className="text-sm text-base-content">Залишилось: {minutes}:{seconds.toString().padStart(2, '0')} — Питання {current} з {total}</span>
                )}
                {config.mode !== "timed" && (
                    <span className="text-sm text-base-content">{config.title} — Питання {current} з {total}</span>
                )}
                <span className="text-sm font-semibold">{percent}% завершено</span>
            </div>
            <progress className="progress progress-neutral w-full h-3" value={current} max={total}></progress>
        </div>
    );
}