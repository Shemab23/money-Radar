import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { docsSections } from "@/content/docs";
import { ScreenLayout } from "@/layouts/ScreenLayout";
import { View } from "react-native";

export function DocsScreen() {
  return (
    <ScreenLayout>
      <View style={{ paddingTop: 24, gap: 4 }}>
        <AppText variant="title">How to use Money Radar</AppText>
        <AppText variant="caption" tone="muted">
          A short guide to every part of the app.
        </AppText>
      </View>
      {docsSections.map((s) => (
        <Card key={s.title}>
          <AppText variant="heading">{s.title}</AppText>
          {s.paragraphs.map((p, i) => (
            <AppText key={i} style={{ marginTop: 8 }}>
              {p}
            </AppText>
          ))}
          {s.bullets && s.bullets.length > 0 && (
            <View style={{ marginTop: 8, gap: 4 }}>
              {s.bullets.map((b, i) => (
                <AppText key={i} variant="caption" tone="muted">
                  • {b}
                </AppText>
              ))}
            </View>
          )}
        </Card>
      ))}
    </ScreenLayout>
  );
}
