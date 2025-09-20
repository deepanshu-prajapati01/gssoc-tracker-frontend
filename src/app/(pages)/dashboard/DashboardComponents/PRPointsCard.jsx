import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const PRPointsCard = ({ prs }) => {
  // Categorize PRs by their points
  const categories = [
    { label: 'No Labels (0 pts)', points: 0 },
    { label: 'Level 1 (3 pts)', points: 3 },
    { label: 'Level 2 (7 pts)', points: 7 },
    { label: 'Level 3 (10 pts)', points: 10 },
  ];

  // Count PRs per category
  const data = categories.map(cat => ({
    name: cat.label,
    count: prs.filter(pr => pr.points === cat.points).length,
  }));

  return (
    <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-4 bg-white dark:bg-neutral-800/50 shadow-sm hover:shadow transition-shadow duration-200">
      {/* Header */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        PR Distribution by Points
      </h3>

      {/* Bar Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-neutral-700" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#64748b' }}
              className="dark:fill-slate-400"
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              className="dark:fill-slate-500"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-neutral-800 p-2 border border-slate-200 dark:border-neutral-700 rounded-md shadow-md">
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-100">{label}</p>
                      <p className="text-xs text-emerald-600 dark:text-violet-400">
                        {payload[0].value} {payload[0].value === 1 ? 'PR' : 'PRs'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="#10b981"
              className="dark:fill-violet-500"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PRPointsCard;