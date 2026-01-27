import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { years } from "@/data/marketData";

interface YearSelectorProps {
  value: number;
  onChange: (year: number) => void;
  label?: string;
}

export function YearSelector({ value, onChange, label = "Select Year" }: YearSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
        <SelectTrigger className="w-[120px] border-border bg-secondary/50">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
