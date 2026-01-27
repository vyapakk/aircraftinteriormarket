import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Armchair, Plane, DollarSign, BarChart3 } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { MarketTrendChart } from "@/components/dashboard/MarketTrendChart";
import { SegmentPieChart } from "@/components/dashboard/SegmentPieChart";
import { RegionalBarChart } from "@/components/dashboard/RegionalBarChart";
import { YearSelector } from "@/components/dashboard/YearSelector";
import { SegmentTabs, SegmentType } from "@/components/dashboard/SegmentTabs";
import { ComparisonTable } from "@/components/dashboard/ComparisonTable";

import {
  totalMarketData,
  endUserData,
  aircraftTypeData,
  regionData,
  applicationData,
  furnishedEquipmentData,
  calculateCAGR,
} from "@/data/marketData";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [segmentType, setSegmentType] = useState<SegmentType>("endUser");

  // Calculate KPI values
  const currentMarketValue = totalMarketData.find((d) => d.year === selectedYear)?.value ?? 0;
  const previousYearValue = totalMarketData.find((d) => d.year === selectedYear - 1)?.value ?? 0;
  const yoyChange = previousYearValue > 0 ? ((currentMarketValue - previousYearValue) / previousYearValue) * 100 : 0;
  
  const value2024 = totalMarketData.find((d) => d.year === 2024)?.value ?? 0;
  const value2034 = totalMarketData.find((d) => d.year === 2034)?.value ?? 0;
  const cagr2024to2034 = calculateCAGR(value2024, value2034, 10);

  // Get current segment data
  const getSegmentData = () => {
    switch (segmentType) {
      case "endUser":
        return { data: endUserData, title: "By End User Type" };
      case "aircraft":
        return { data: aircraftTypeData, title: "By Aircraft Type" };
      case "region":
        return { data: regionData, title: "By Region" };
      case "application":
        return { data: applicationData, title: "By Application" };
      case "equipment":
        return { data: furnishedEquipmentData, title: "By Equipment Type" };
      default:
        return { data: endUserData, title: "By End User Type" };
    }
  };

  const currentSegment = getSegmentData();

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SegmentTabs value={segmentType} onChange={setSegmentType} />
          <YearSelector value={selectedYear} onChange={setSelectedYear} />
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Market Size"
            value={currentMarketValue / 1000}
            suffix="B"
            change={yoyChange}
            changeLabel="YoY"
            icon={DollarSign}
            delay={0}
            accentColor="primary"
          />
          <KPICard
            title="2034 Forecast"
            value={value2034 / 1000}
            suffix="B"
            icon={TrendingUp}
            delay={0.1}
            accentColor="accent"
          />
          <KPICard
            title="10-Year CAGR"
            value={cagr2024to2034}
            prefix=""
            suffix="%"
            icon={BarChart3}
            delay={0.2}
            accentColor="chart-4"
          />
          <KPICard
            title="Regions Covered"
            value={4}
            prefix=""
            suffix=""
            decimals={0}
            icon={Globe}
            delay={0.3}
            accentColor="chart-3"
          />
        </div>

        {/* Main Charts Row */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MarketTrendChart
              data={totalMarketData}
              segments={currentSegment.data}
              title="Market Size Trend"
              subtitle="Historical and forecast data (US$ Millions)"
              showSegments
            />
          </div>
          <SegmentPieChart
            data={currentSegment.data}
            year={selectedYear}
            title={currentSegment.title}
          />
        </div>

        {/* Secondary Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RegionalBarChart
            data={regionData}
            year={selectedYear}
            title="Regional Distribution"
            subtitle={`Market size by region in ${selectedYear}`}
          />
          <RegionalBarChart
            data={aircraftTypeData}
            year={selectedYear}
            title="Aircraft Type Breakdown"
            subtitle={`Market size by aircraft type in ${selectedYear}`}
          />
        </div>

        {/* Comparison Table */}
        <ComparisonTable
          data={currentSegment.data}
          startYear={2024}
          endYear={2034}
          title={`${currentSegment.title} - Growth Analysis`}
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 border-t border-border pt-6"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm text-muted-foreground">
                Aircraft Interiors Market Research Report
              </p>
              <p className="text-xs text-muted-foreground/70">
                All values in US$ Millions unless otherwise specified
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Market Intelligence Dashboard
              </span>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
