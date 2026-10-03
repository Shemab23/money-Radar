import { useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "./AppText";
import { IconButton } from "./IconButton";

export function ScreenHeader({
  title,
  icon = "back",
}: {
  title: string;
  icon?: "back" | "close";
}) {
  const router = useRouter();
  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingTop: 16,
      }}
    >
      <IconButton
        icon={icon === "close" ? X : ChevronLeft}
        label="Go back"
        onPress={goBack}
      />
      <AppText variant="heading">{title}</AppText>
    </View>
  );
}
