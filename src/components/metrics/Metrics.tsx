import { CPUChart } from "./charts/CPUChart";
import { MemoryChart } from "./charts/MemoryChart";
import { DiskChart } from "./charts/DiskChart";
import { NetworkChart } from "./charts/NetworkChart";
import { GPUChart } from "./charts/GPUChart";
import { BatteryChart } from "./charts/BatteryChart";
import { LoadChart } from "./charts/LoadChart";
import MetricsDocumentation from "./charts/MetricsDocumentation";

export default function GrafanaDashboard({ history }: any) {
    const latest = history?.[history.length - 1] || {};

    return (
        <div className="w-full space-y-6 overflow-hidden">

            {/* ---- System Info Card ---- */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-3">System Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                    <p><strong>Hostname:</strong> {latest.hostname}</p>
                    <p><strong>OS:</strong> {latest.os}</p>
                    <p><strong>CPU Model:</strong> {latest.cpu_model}</p>
                    <p><strong>Total RAM:</strong> {latest.ram_total_gb} GB</p>
                    <p><strong>Uptime:</strong> {Math.floor((latest.system_uptime_sec || 0) / 3600)} hrs</p>
                    <p><strong>Requests (1 Min):</strong> {latest.requests_last_minute}</p>
                </div>
            </div>

            {/* ---- Responsive Chart Grid ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">

                <div className="h-64">
                    <CPUChart data={history} />
                </div>

                <div className="h-64">
                    <MemoryChart data={history} />
                </div>

                <div className="h-64">
                    <DiskChart data={history} />
                </div>

                <div className="h-64 sm:col-span-2 lg:col-span-1">
                    <NetworkChart data={history} />
                </div>

                <div className="h-64">
                    <GPUChart data={history} />
                </div>

                <div className="h-64">
                    <BatteryChart data={history} />
                </div>

                <div className="h-64 lg:col-span-3">
                    <LoadChart data={history} />
                </div>

            </div>
            <MetricsDocumentation />
        </div>
    );
}
