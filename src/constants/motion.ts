import { Easing } from "react-native-reanimated";

export const motion = {
  duration: 200,
  enterDuration: 300,
  stagger: 60,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
};
