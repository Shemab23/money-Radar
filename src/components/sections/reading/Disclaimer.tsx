import { AppText } from "@/components/ui/AppText";
import { strings } from "@/content/strings";

export function Disclaimer() {
  return (
    <AppText variant="caption" tone="muted" style={{ marginTop: 8 }}>
      {strings.disclaimer}
    </AppText>
  );
}
