import { motion } from "framer-motion";
import { SegmentData } from "@/data/marketData";

interface ComparisonTableProps {
  data: SegmentData[];
  startYear: number;
  endYear: number;
  title: string;
}

export function ComparisonTable({
  data,
  startYear,
  endYear,
  title,
}: ComparisonTableProps) {
  const tableData = data.map((segment) => {
    const startValue = segment.data.find((d) => d.year === startYear)?.value ?? 0;
    const endValue = segment.data.find((d) => d.year === endYear)?.value ?? 0;
    const cagr = startValue > 0 
      ? (Math.pow(endValue / startValue, 1 / (endYear - startYear)) - 1) * 100 
      : 0;
    const growth = startValue > 0 ? ((endValue - startValue) / startValue) * 100 : 0;

    return {
      name: segment.name,
      startValue,
      endValue,
      cagr,
      growth,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {startYear} vs {endYear} Comparison
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Segment
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {startYear}
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {endYear}
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CAGR
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tableData.map((row, idx) => (
              <motion.tr
                key={row.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="hover:bg-secondary/20 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm text-muted-foreground">
                  ${row.startValue.toLocaleString()}M
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm text-foreground">
                  ${row.endValue.toLocaleString()}M
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`font-mono text-sm font-medium ${
                      row.cagr >= 0 ? "text-chart-4" : "text-destructive"
                    }`}
                  >
                    {row.cagr >= 0 ? "+" : ""}
                    {row.cagr.toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`font-mono text-sm font-medium ${
                      row.growth >= 0 ? "text-chart-4" : "text-destructive"
                    }`}
                  >
                    {row.growth >= 0 ? "+" : ""}
                    {row.growth.toFixed(0)}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
