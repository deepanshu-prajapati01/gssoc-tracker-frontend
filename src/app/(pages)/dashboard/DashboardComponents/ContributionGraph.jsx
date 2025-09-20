import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const ContributionGraph = ({ className, contributionGraph }) => {
    const data = Object.entries(contributionGraph).map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
        count: count || 0,
    }));

    return (
        <div className={`${className} w-full bg-white dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-200`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Contribution Activity
                </h3>
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-neutral-700/50 text-slate-600 dark:text-slate-300 rounded-full">
                    Last {Object.keys(contributionGraph).length} days
                </span>
            </div>

            {/* Chart */}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorCountCyan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#18ffff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#18ffff" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            className="stroke-slate-100 dark:stroke-neutral-700"
                        />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 11,
                                className: "dark:fill-slate-400",
                            }}
                            interval={Math.ceil(Object.keys(contributionGraph).length / 7)}
                            padding={{ left: 5, right: 5 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11,
                                className: "dark:fill-slate-500",
                            }}
                            width={20}
                            tickFormatter={(value) => (value === 0 ? "" : value)}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white dark:bg-neutral-800 p-2 border border-slate-200 dark:border-neutral-700 rounded-lg shadow-lg">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {label}
                                            </p>
                                            <p className="text-sm text-cyan-600 dark:text-cyan-400">
                                                {payload[0].value}{" "}
                                                {payload[0].value === 1
                                                    ? "contribution"
                                                    : "contributions"}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#18ffff"
                            className="dark:stroke-cyan-400"
                            fillOpacity={1}
                            fill="url(#colorCountCyan)"
                            classNameDark="fill-cyan-900/20"
                            strokeWidth={2}
                            activeDot={{
                                r: 5,
                                fill: "#18ffff",
                                stroke: "#fff",
                                strokeWidth: 2,
                                className:
                                    "dark:fill-cyan-400 dark:stroke-cyan-900/50",
                                style: {
                                    filter:
                                        "drop-shadow(0 0 2px rgba(24, 159, 255, 0.5))",
                                },
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ContributionGraph;
