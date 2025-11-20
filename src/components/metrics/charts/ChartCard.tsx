export function ChartCard({ title, children }: any) {
    return (
        <div className="  rounded-xl shadow p-4 h-full">
            <h2 className="font-semibold mb-2">{title}</h2>
            <div className="h-[90%]">{children}</div>
        </div>
    );
}
