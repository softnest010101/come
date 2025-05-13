"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export type ChartType = "bar" | "line" | "pie";

export type ChartDataPoint = {
  name: string;
  value: number;
  [key: string]: string | number;
};

export type ChartConfig = {
  type: ChartType;
  data: ChartDataPoint[];
  options?: Record<string, unknown>;
};

type Props = {
  config: ChartConfig;
};

const COLORS: string[] = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4de6c",
  "#d0ed57",
];

export default function ChartTool({ config }: Props) {
  const { type, data } = config;

  const [isValid, setIsValid] = useState(true);

  // 🧪 Tool config validation (optional future)
  useEffect(() => {
    const valid =
      typeof type === "string" &&
      ["bar", "line", "pie"].includes(type) &&
      Array.isArray(data) &&
      data.every((d) => typeof d.name === "string" && typeof d.value === "number");
    setIsValid(valid);
  }, [type, data]);

  if (!isValid) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for ChartTool.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          📊 Chart Tool
        </h3>
        <p className="text-sm italic text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        📊 Chart Tool ({type})
      </h3>

      {/* 🧰 Custom Field Editor notice */}
      <div className="text-sm italic text-yellow-700 mb-3">
        Editing chart data coming soon...
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {type === "bar" ? (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        ) : type === "line" ? (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        ) : type === "pie" ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-red-600">Unsupported chart type</p>
        )}
      </ResponsiveContainer>
    </div>
  );
}
