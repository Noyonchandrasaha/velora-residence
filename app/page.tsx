import { CinematicWalkthroughHero } from "@/components/sections/cinematic-walkthrough-hero";
import { ResidenceOverview } from "@/components/sections/residence-overview";
import { MetricsStrip } from "@/components/sections/metrics-strip";
import { BlueManifesto } from "@/components/sections/blue-manifesto";
import { CircularSplitReveal } from "@/components/sections/circular-split-reveal";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { LayeredInteriorStory } from "@/components/sections/layered-interior-story";
import { InterludeReveal } from "@/components/sections/interlude-reveal";
import { ClosingInvitation } from "@/components/sections/closing-invitation";

export default function Home() {
  return (
    <main>
      <CinematicWalkthroughHero />
      <ResidenceOverview />
      <MetricsStrip />
      <BlueManifesto />
      <CircularSplitReveal />
      <FeatureGrid />
      <LayeredInteriorStory />
      <InterludeReveal />
      <ClosingInvitation />
    </main>
  );
}
