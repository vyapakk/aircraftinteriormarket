import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { SegmentData } from "@/data/marketData";

interface RegionalBarChartProps {
  data: SegmentData[];
  year: number;
  title: string;
  subtitle?: string;
}

const chartColors = [
  "hsl(192, 95%, 55%)",
  "hsl(38, 92%, 55%)",
  "hsl(262, 83%, 58%)",
  "hsl(142, 71%, 45%)",
];

export function RegionalBarChart({
  data,
  year,
  title,
  subtitle,
}: RegionalBarChartProps) {
  const barData = data.map((segment, index) => ({
    name: segment.name,
    value: segment.data.find((d) => d.year === year)?.value ?? 0,
    color: chartColors[index % chartColors.length],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-popover p-4 shadow-lg">
          <p className="mb-2 font-semibold text-foreground">{label}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Market Size:</span>
            <span className="font-mono font-medium text-foreground">
              ${payload[0].value.toLocaleString()}M
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(217, 33%, 18%)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Market Size">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
