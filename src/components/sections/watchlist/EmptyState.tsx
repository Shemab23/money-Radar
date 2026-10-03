import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { EmptyStateData } from "@/types/sections";

export function EmptyState({
  data,
  onAdd,
}: {
  data: EmptyStateData;
  onAdd: () => void;
}) {
  return (
    <Card>
      <AppText variant="heading">{data.title}</AppText>
      <AppText style={{ marginTop: 6 }}>{data.body}</AppText>
      <Button label={data.actionLabel} onPress={onAdd} />
    </Card>
  );
}
