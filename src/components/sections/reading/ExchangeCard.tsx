import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";
import { formatPrice } from "@/lib/format";
import type { ExchangeData } from "@/types/sections";
import { ArrowUpDown } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export function ExchangeCard({ data }: { data: ExchangeData }) {
  const { colors } = useTheme();
  const [amount, setAmount] = useState("1");
  const [flipped, setFlipped] = useState(false);

  const rate = flipped ? 1 / data.rate : data.rate;
  const baseSymbol = flipped ? data.quoteCode : data.baseSymbol;
  const quoteCode = flipped ? data.baseSymbol : data.quoteCode;
  const anchorText = flipped
    ? "1 " +
      data.quoteCode +
      " = " +
      formatPrice(1 / data.rate) +
      " " +
      data.baseSymbol
    : "1 " + data.baseSymbol + " = " + data.rateText + " " + data.quoteCode;

  const converted = useMemo(() => {
    const n = Number(amount.replace(",", "."));
    if (!Number.isFinite(n)) return null;
    return n * rate;
  }, [amount, rate]);

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <AppText variant="heading">Exchange</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Swap base and quote"
          onPress={() => setFlipped((f) => !f)}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.bg,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ArrowUpDown size={14} color={colors.heading} />
          <AppText variant="caption" style={{ fontWeight: "600" }}>
            Swap
          </AppText>
        </Pressable>
      </View>

      {/* Top: amount in base currency (editable) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: colors.bg,
        }}
      >
        <AppText
          variant="heading"
          tone="muted"
          style={{ marginRight: 8, fontSize: 20 }}
        >
          {baseSymbol}
        </AppText>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="1"
          placeholderTextColor={colors.muted}
          style={{
            flex: 1,
            color: colors.heading,
            fontSize: 20,
            fontWeight: "600",
            padding: 0,
          }}
        />
      </View>

      {/* Bottom: converted amount (read-only) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <AppText variant="heading" style={{ fontSize: 20 }}>
          {converted === null ? "—" : formatPrice(converted)}
        </AppText>
        <AppText variant="caption" tone="muted" style={{ fontSize: 14 }}>
          {quoteCode}
        </AppText>
      </View>

      {/* Anchor rate caption — flips with the swap */}
      <AppText variant="caption" tone="muted" style={{ marginTop: 4 }}>
        {anchorText}
      </AppText>
    </Card>
  );
}
