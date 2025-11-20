"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export function MonthlyActivity({ matrix }: any) {
  if (!matrix || !Array.isArray(matrix.matrix)) return null;

  // Month Names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Convert backend matrix → chart-friendly format
  const chartData = matrix.matrix.map((m: any) => ({
    month: monthNames[m.month - 1],
    usersRegistered: m.usersRegistered,
    notesCreated: m.notesCreated,
  }));

  return (
    <Card className="rounded-2xl p-4 w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-base sm:text-lg">
          Monthly Activity ({matrix.year})
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full" style={{ minHeight: "260px" }}>
          <ResponsiveContainer width="100%" aspect={2.3}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              <XAxis dataKey="month" tick={{ fontSize: 12 }} />

              <Tooltip
                wrapperStyle={{ zIndex: 30 }}
                contentStyle={{ borderRadius: "10px", padding: "6px 10px" }}
              />

              <Legend />

              {/* USERS Registered Line */}
              <Line
                type="monotone"
                dataKey="usersRegistered"
                name="Users Registered"
                stroke="#6366F1"       // Indigo
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                animationDuration={700}
              />

              {/* NOTES Created Line */}
              <Line
                type="monotone"
                dataKey="notesCreated"
                name="Notes Created"
                stroke="#10B981"       // Green
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                animationDuration={700}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
