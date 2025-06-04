export default function StatisticsSection() {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Твій прогрес у навчанні</h2>
                <p className="text-gray-600 mb-8">
                    Стеж за своїми результатами, отримуй підказки, повторюй слабкі теми та досягай мети!
                </p>
                <div className="radial-progress text-success" style={{ "--value": 85 } as any}>85%</div>
                <p className="mt-4 text-lg font-medium">Готовність до іспиту</p>
            </div>
        </section>
    );
}
