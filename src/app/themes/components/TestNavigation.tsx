import {Star, StarOff} from "lucide-react";

interface TestNavigationProps {
    onNext: () => void;
    onPrev: () => void;
    onJump: (index: number) => void;
    showNext: boolean;
    showPrev: boolean;
    isLast: boolean;
    config: {
        mode: string;
        allowChangeAnswer: boolean;
    };
    handleToggleFavorite: () => void;
    isFavorite: boolean;
}

export default function TestNavigation({
                                           onNext,
                                           onPrev,
                                           showNext,
                                           showPrev,
                                           isLast,
                                           handleToggleFavorite,
                                           isFavorite,
                                       }: TestNavigationProps) {
    return (
        <div className="flex justify-between items-center mt-6 gap-4">
            <button
                disabled={!showPrev}
                onClick={onPrev}
                className="btn btn-outline"
            >
                Попереднє
            </button>

            <div className="flex items-center justify-center">
                <button
                    onClick={handleToggleFavorite}
                    className="btn btn-md btn-circle transition-transform hover:scale-110"
                    aria-label="Додати в обране"
                >
                    {isFavorite ? (
                        <Star className="w-6 h-6 text-neutral fill-current" stroke="none"/>
                    ) : (
                        <Star className="w-6 h-6 text-neutral"/>
                    )}
                </button>
            </div>

            {showNext && (
                <button
                    onClick={onNext}
                    className={`btn ${isLast ? 'btn-primary' : 'btn-neutral'}`}
                >
                    {isLast ? 'Завершити' : 'Наступне'}
                </button>
            )}
        </div>

    );
}