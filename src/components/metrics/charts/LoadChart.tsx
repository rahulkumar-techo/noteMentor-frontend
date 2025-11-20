import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";

export function LoadChart({ data }: { data: any[] }) {
  return (
    <ChartCard title="Node Load Metrics">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(v) => new Date(v).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip />

          {/* Event Loop Lag */}
          <Line
            type="monotone"
            dataKey="node_event_loop_lag_ms"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
            name="Event Loop Lag (ms)"
          />

          {/* CPU Queue Length */}
          <Line
            type="monotone"
            dataKey="node_cpu_queue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="CPU Queue Length"
          />

          {/* Combined Load Score (0–1) */}
          <Line
            type="monotone"
            dataKey="node_load_score"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Node Load Score (0–1)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
