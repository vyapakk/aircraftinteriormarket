import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SegmentType = "endUser" | "aircraft" | "region" | "application" | "equipment";

interface SegmentTabsProps {
  value: SegmentType;
  onChange: (value: SegmentType) => void;
}

const segments = [
  { id: "endUser" as const, label: "End User" },
  { id: "aircraft" as const, label: "Aircraft Type" },
  { id: "region" as const, label: "Region" },
  { id: "application" as const, label: "Application" },
  { id: "equipment" as const, label: "Equipment" },
];

export function SegmentTabs({ value, onChange }: SegmentTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Tabs value={value} onValueChange={(v) => onChange(v as SegmentType)}>
        <TabsList className="bg-secondary/50 border border-border p-1">
          {segments.map((segment) => (
            <TabsTrigger
              key={segment.id}
              value={segment.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {segment.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
