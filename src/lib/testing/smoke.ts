import { presetPairs } from "@/data/pairs";
import { behaviorState } from "@/lib/analysis/behavior";
import { fitLinear } from "@/lib/analysis/linear";
import { patternStat } from "@/lib/analysis/pattern";
import { fetchPairSeries } from "@/lib/api/series";
import { sliceTimeframe } from "@/lib/mappers/series";

(async () => {
  for (const p of presetPairs) {
    try {
      const s = await fetchPairSeries(p);
      const tf = sliceTimeframe(s.points, "3M");
      const fit = fitLinear(tf, 0.5, s.granularity);
      const b = behaviorState(s);
      const pat = b ? patternStat(s, b) : null;
      console.log(
        p.label,
        s.points.length,
        s.granularity,
        b?.behavior ?? "no-behavior",
        fit ? fit.fit + " R2=" + fit.r2.toFixed(2) : "no-fit",
        pat ? pat.matches + " matches" : "no-pattern",
      );
    } catch (e) {
      console.log(p.label, "ERROR", String(e));
    }
  }
})();
