export interface DocSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const docsSections: DocSection[] = [
  {
    title: "What this app does",
    paragraphs: [
      "Money Radar reads how a currency or crypto pair is behaving. It fetches one long daily series per pair and shows you the current rate, the shape of the recent trend, and what similar setups have done in the past.",
      "It is a reading tool, not a prediction engine. Everything shown is based on past data.",
    ],
  },
  {
    title: "The pair list",
    paragraphs: [
      "Each row shows the latest rate, the change over the last month, a small sparkline of that month, and a behaviour chip if daily data is available.",
    ],
    bullets: [
      "Tap a row to open the full reading.",
      "Tap Add a pair to add more currencies or crypto.",
      "Swipe nothing — the list is meant to be quiet.",
    ],
  },
  {
    title: "Exchange",
    paragraphs: [
      "The converter at the top of a pair screen converts between the two currencies using the latest real rate. The top field is editable; the bottom shows the converted amount.",
      "Tap Swap to flip the direction. The amount stays where it is; only the currency it represents changes.",
    ],
  },
  {
    title: "The price chart",
    paragraphs: [
      "The solid line is the real price. The dashed line is a straight-line fit through the window you selected. The shaded band is your tolerance: how far from the line counts as normal wobble.",
      "If the price sits inside the band, it is not doing anything unusual. If it sits outside, it is deviating from its own recent behaviour.",
    ],
  },
  {
    title: "Tolerance slider",
    paragraphs: [
      "The slider widens or narrows the band. A tighter band flags more days as unusual; a wider band flags fewer.",
      "The coverage line under the slider tells you what share of days in this window fell inside the current band. That is a quick sanity check: if coverage is 95%, the band is wide; if it is 50%, the band is tight.",
    ],
  },
  {
    title: "Verdict",
    paragraphs: [
      "The verdict card tells you the direction and speed of the fit, whether today sits inside or outside the band, and a short projection for the next one and two steps (days or months, depending on the data).",
    ],
  },
  {
    title: "Behaviour",
    paragraphs: [
      "The behaviour card reads the streak, pace, and magnitude of the latest move. Climbing, surging, slipping, sliding, stalling, steady, reversing.",
      "It only appears when the pair has daily data. If the provider publishes monthly rates, this card explains why it cannot read behaviour and shows the straight-line view instead.",
    ],
    bullets: [
      "Streak: how many days in a row the pair has moved the same way.",
      "Avg/day: the average size of the move during the streak.",
      "Total: the compounded move across the streak.",
      "Past cases: how often similar setups continued, and how often any setup continued, over the next few days.",
    ],
  },
  {
    title: "Where the data comes from",
    paragraphs: [
      "Fiat pairs come from Frankfurter. Rwandan franc pairs use Frankfurter's BNR provider, which publishes monthly rates — those pairs get the straight-line view only.",
      "Crypto pairs come from CoinGecko. A free demo key is optional and only raises the rate limit.",
    ],
  },
  {
    title: "What this is not",
    paragraphs: [
      "Based on past data. Patterns can stop at any time. This is not financial advice.",
    ],
  },
];
