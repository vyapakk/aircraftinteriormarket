import { useCallback, RefObject } from "react";
import { toPng } from "html-to-image";

export function useChartDownload() {
  const downloadChart = useCallback(
    async (ref: RefObject<HTMLDivElement>, filename: string) => {
      if (!ref.current) return;

      try {
        const dataUrl = await toPng(ref.current, {
          backgroundColor: "#0a0f1a",
          quality: 1,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to download chart:", error);
      }
    },
    []
  );

  return { downloadChart };
}
