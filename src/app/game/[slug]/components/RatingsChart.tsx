"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const ratings = [
  { id: 5, title: "exceptional", count: 29, percent: 54.72 },
  { id: 4, title: "recommended", count: 17, percent: 32.08 },
  { id: 3, title: "meh", count: 5, percent: 9.43 },
  { id: 1, title: "skip", count: 2, percent: 3.77 },
];

export default function RatingsChart() {
  return (
    <div className="w-full h-[300px] bg-black/30 rounded-2xl flex items-center justify-center p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={ratings}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="title" tick={{ fill: "#aaa", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 60]} tick={{ fill: "#666" }} />
          <Radar
            name="Ratings"
            dataKey="percent"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}