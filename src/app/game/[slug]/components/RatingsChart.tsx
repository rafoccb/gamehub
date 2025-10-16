"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { GameRatings } from "../../../types/type"

type RatingProps = {
	ratings: GameRatings[];
}

// const ratings = [
//   { id: 5, title: "exceptional", count: 29, percent: 54.72 },
//   { id: 4, title: "recommended", count: 17, percent: 32.08 },
//   { id: 3, title: "meh", count: 5, percent: 9.43 },
//   { id: 1, title: "skip", count: 2, percent: 3.77 },
// ];

export default function RatingsChart({ratings}: RatingProps) {
	console.log(ratings);

  const order = ["exceptional", "recommended", "meh", "skip"]

  const orderedRatings = ratings.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title))

	return (
		 <div className="relative w-full h-[320px] p-4 bg-gradient-to-b from-black/50 to-zinc-900/30 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-800/30 mt-12">
      <div className="absolute inset-0 blur-3xl bg-gradient-to-t from-yellow-800/30 via-rose-500/10 to-transparent pointer-events-none" />
      <p className="text-center text-violet-300 text-sm mt-3 tracking-wider font-light italic">
        Echoes of players perception
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
			cx="50%"
			cy="50%"
			outerRadius="80%"
			startAngle={45}
			endAngle={405}
			data={orderedRatings}
		>
          {/* ✨ Definição de gradiente interno */}
          <defs>
            <radialGradient id="vesselGradient" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#f5e42c" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#1F1F1F" stopOpacity={0.1} />
            </radialGradient>
          </defs>

          {/* Linhas da teia */}
          <PolarGrid stroke="#3A3A3A" strokeDasharray="3 3" />

          {/* Títulos das seções */}
          <PolarAngleAxis
            dataKey="title"
          
            tick={{ fill: "#f5e42c", fontSize: 12, fontWeight: 600 }}
          />

          {/* Eixo de raio (invisível) */}
          <PolarRadiusAxis tick={false} axisLine={false} />

          {/* Radar propriamente dito */}
          <Radar
            name="Ratings"
            dataKey="percent"
            stroke="#f5e42c"
            strokeWidth={2}
            fill="url(#vesselGradient)"
            fillOpacity={0.6}
            animationDuration={1800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
	);
}