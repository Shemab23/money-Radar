import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { ReadingChart } from "@/components/ui/ReadingChart";
import { strings } from "@/content/strings";
import type { ChartData } from "@/types/sections";

export function ReadingPanel({ data }: { data: ChartData | null }) {
  if (!data) {
    return (
      <Card>
        <AppText variant="caption" tone="muted">
          {strings.notEnoughPoints}
        </AppText>
      </Card>
    );
  }
  return (
    <Card>
      <ReadingChart data={data} />
      <AppText variant="caption" tone="muted" style={{ marginTop: 8 }}>
        {data.startLabel} → {data.endLabel}
      </AppText>
    </Card>
  );
}
