import { motion } from "@/constants/motion";
import { useEffect, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export function FadeUp({
  children,
  index = 0,
  style,
}: {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const progress = useSharedValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    progress.value = reduce
      ? 1
      : withDelay(
          index * motion.stagger,
          withTiming(1, {
            duration: motion.enterDuration,
            easing: motion.easing,
          }),
        );
  }, [index, reduce, progress]);

  const animated = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 12 }],
  }));

  return <Animated.View style={[animated, style]}>{children}</Animated.View>;
}
