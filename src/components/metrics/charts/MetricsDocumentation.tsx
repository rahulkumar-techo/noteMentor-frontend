
export default function MetricsDocumentation() {
  return (
    <div className="p-6 rounded-xl shadow space-y-6 ">
      <h1 className="text-2xl font-bold mb-4">📘 System Metrics Documentation</h1>

      {/* System Metadata */}
      <DocCategory title="🖥 System Metadata">
        <DocItem
          name="timestamp"
          desc="Unix time (ms) when the metrics snapshot was taken."
          example="1763645068565"
        />
        <DocItem
          name="hostname"
          desc="Device name of the machine."
          example="rahul"
        />
        <DocItem
          name="os"
          desc="Operating system and version."
          example="Windows 11 Home 10.0.26100"
        />
        <DocItem
          name="cpu_model"
          desc="Processor model and generation."
          example="Intel Core i3-1115G4"
        />
        <DocItem
          name="ram_total_gb"
          desc="Total RAM available on the system."
          example="7.65 GB"
        />
        <DocItem
          name="system_uptime_sec"
          desc="Time since system boot (in seconds)."
          example="179849.109"
        />
      </DocCategory>

      {/* CPU */}
      <DocCategory title="🧠 CPU Metrics">
        <DocItem
          name="cpu"
          desc="Total CPU usage percentage across all cores."
          example="86.1%"
        />
        <DocItem
          name="cpu_temp"
          desc="CPU temperature in Celsius. (Windows may return 0.)"
          example="0°C"
        />
      </DocCategory>

      {/* Memory */}
      <DocCategory title="💾 Memory Metrics">
        <DocItem
          name="memory"
          desc="RAM usage percentage."
          example="84.3%"
        />
        <DocItem
          name="memory_gb"
          desc="RAM used in gigabytes."
          example="6.45 GB"
        />
      </DocCategory>

      {/* Disk */}
      <DocCategory title="📂 Disk Metrics">
        <DocItem
          name="disk"
          desc="Disk usage percentage on primary drive."
          example="45.06%"
        />
        <DocItem
          name="disk_free_gb"
          desc="Remaining free space on primary drive."
          example="100.1 GB"
        />
      </DocCategory>

      {/* Network */}
      <DocCategory title="🌐 Network Metrics">
        <DocItem
          name="net_rx"
          desc="Network download/receive speed (KB/s)."
          example="40.1 KB/s"
        />
        <DocItem
          name="net_tx"
          desc="Network upload/transmit speed (KB/s)."
          example="19.2 KB/s"
        />
      </DocCategory>

      {/* GPU */}
      <DocCategory title="🎮 GPU Metrics">
        <DocItem
          name="gpu_usage"
          desc="GPU usage percentage."
          example="0%"
        />
        <DocItem
          name="gpu_temp"
          desc="GPU temperature in °C."
          example="0°C"
        />
      </DocCategory>

      {/* Battery */}
      <DocCategory title="🔋 Battery Metrics">
        <DocItem
          name="battery_percent"
          desc="Battery level percentage."
          example="82%"
        />
        <DocItem
          name="is_on_ac"
          desc="Whether device is plugged into AC power."
          example="true"
        />
      </DocCategory>

      {/* Node.js Load */}
      <DocCategory title="⚙ Node.js Runtime Metrics">
        <DocItem
          name="node_event_loop_lag_ms"
          desc="Delay in Node.js event loop (ms). Higher = overloaded."
          example="0.12 ms"
        />
        <DocItem
          name="node_cpu_queue"
          desc="CPU task queue length (Windows-friendly load metric)."
          example="0"
        />
        <DocItem
          name="node_load_score"
          desc="Combined CPU + event loop lag score (0–1)."
          example="0.43"
        />
      </DocCategory>

      {/* Processes */}
      <DocCategory title="🧰 Processes">
        <DocItem
          name="top_processes"
          desc="Top 3 processes consuming the most CPU and RAM."
          example="System Idle Process, MsMpEng.exe, msedge.exe"
        />
      </DocCategory>

      {/* Requests */}
      <DocCategory title="📡 API Traffic">
        <DocItem
          name="total_requests"
          desc="Total number of metrics fetch requests."
          example="12"
        />
        <DocItem
          name="requests_last_minute"
          desc="Number of requests received in the last 60 seconds."
          example="3"
        />
      </DocCategory>
    </div>
  );
}

/* ---------------------- Small Components ---------------------- */

function DocCategory({ title, children }:any) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function DocItem({ name, desc, example }:any) {
  return (
    <div className="p-3 border rounded-lg dark:border-slate-700">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{desc}</p>
      <p className="text-xs text-gray-500 mt-1">
        <strong>Example:</strong> {example}
      </p>
    </div>
  );
}
