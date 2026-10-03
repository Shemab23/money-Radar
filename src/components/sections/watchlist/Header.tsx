import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { strings } from "@/content/strings";
import { View } from "react-native";

export function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={{ paddingTop: 24, gap: 6 }}>
      <AppText variant="title">{strings.appName}</AppText>
      <AppText variant="caption" tone="muted">
        {strings.tagline}
      </AppText>
      <View style={{ marginTop: 12 }}>
        <Button label="Add a pair" onPress={onAdd} />
      </View>
      <View style={{ marginTop: 12 }}>
        <ThemeToggle />
      </View>
    </View>
  );
}
