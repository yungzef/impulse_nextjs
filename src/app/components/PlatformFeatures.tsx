import { Smartphone, TabletSmartphone, MonitorSmartphone } from "lucide-react";

export default function PlatformFeatures() {
    return (
        <section className="bg-base-200 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Доступно на будь-якому пристрої</h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-base-100 rounded-box shadow">
                        <Smartphone className="w-10 h-10 mx-auto text-success mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Смартфон</h3>
                        <p>Навчайся дорогою на роботу чи в черзі. Повна підтримка мобільних пристроїв.</p>
                    </div>
                    <div className="p-6 bg-base-100 rounded-box shadow">
                        <TabletSmartphone className="w-10 h-10 mx-auto text-success mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Планшет</h3>
                        <p>Ідеально підходить для навчання вдома або в аудиторії.</p>
                    </div>
                    <div className="p-6 bg-base-100 rounded-box shadow">
                        <MonitorSmartphone className="w-10 h-10 mx-auto text-success mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Компʼютер</h3>
                        <p>Повноекранний досвід із зручним інтерфейсом для продуктивного навчання.</p>
                    </div>
                </div>
                <p className="text-center mt-8 text-lg font-medium">Один акаунт — усі пристрої</p>
            </div>
        </section>
    );
}
