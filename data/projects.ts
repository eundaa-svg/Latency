// ─────────────────────────────────────────────────────────────────────────────
//  SWAP GUIDE
//  - Replace picsum.photos URLs with your own hosted images or /public paths.
//  - When using real images with next/image, add a blurDataURL to each entry
//    and set placeholder="blur" in the Image components.
//  - Update slug, title, year, category, client, role, description per project.
// ─────────────────────────────────────────────────────────────────────────────

export type Category =
  | "UI/UX"
  | "XR Design"
  | "Graphic Design"
  | "Advertising"
  | "Interaction";

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: Category;
  client: string;
  role: string;
  description: string;
  /** First image is used as the hero and cover card thumbnail. */
  images: string[];
}

// Deterministic picsum seeds so images stay consistent across builds.
const pic = (seed: number, w = 1400, h = 900) =>
  `https://picsum.photos/seed/ltcy${seed}/${w}/${h}`;

export const PROJECTS: Project[] = [
  {
    slug: "haptic-response-system",
    title: "Haptic Response System",
    year: "2024",
    category: "XR Design",
    client: "Internal R&D",
    role: "Lead Interaction Designer",
    description:
      "An explorative system mapping temporal delay between physical gesture and virtual feedback in mixed-reality environments. Research focused on the 11–17ms window within which haptic response is perceived as synchronous with visual stimulus — and what happens when that window is intentionally broken.",
    images: [pic(10, 1400, 900), pic(11, 1200, 800), pic(12, 900, 1200)],
  },
  {
    slug: "interval-ui-kit",
    title: "Interval — Temporal UI Kit",
    year: "2023",
    category: "UI/UX",
    client: "Open Source",
    role: "Design System Lead",
    description:
      "A component library where timing is a first-class design token. Transitions, delays, and durations are named semantic variables — not just easing functions, but moments: enter, linger, exit. Every component has an opinion about its own pacing.",
    images: [pic(20, 1400, 900), pic(21, 1200, 800), pic(22, 1200, 800)],
  },
  {
    slug: "pause-campaign",
    title: "Pause Campaign",
    year: "2023",
    category: "Advertising",
    client: "Confidential",
    role: "Art Director",
    description:
      "A brand campaign built on a single constraint: no animation faster than 600ms. Every transition required to be perceptible, to make the viewer aware of the interval. The slowness was the message — in a medium where everything accelerates, deliberate pause became the differentiator.",
    images: [pic(30, 1400, 900), pic(31, 1200, 800), pic(32, 1400, 800)],
  },
  {
    slug: "signal-type",
    title: "Signal — Type in Time",
    year: "2022",
    category: "Graphic Design",
    client: "Self-initiated",
    role: "Designer",
    description:
      "A typeface experiment where letterform weight is modulated by playback position — letters thicken as a phrase completes, like a voice gaining confidence. Weight is not a style decision; it is a timestamp. The typeface records its own performance.",
    images: [pic(40, 1400, 900), pic(41, 1200, 800), pic(42, 800, 1200)],
  },
  {
    slug: "threshold",
    title: "Threshold",
    year: "2022",
    category: "Interaction",
    client: "Gallery Commission",
    role: "Interaction Designer",
    description:
      "An installation where a doorway sensor measures a visitor's crossing speed. Text responds in kind — rushed visitors receive a fragment; slow visitors receive the complete text. Patience is the only input. The system cannot be gamed; it can only be inhabited.",
    images: [pic(50, 1400, 900), pic(51, 1200, 800), pic(52, 900, 1200)],
  },
  {
    slug: "drift-identity",
    title: "Drift Identity System",
    year: "2022",
    category: "Graphic Design",
    client: "Drift Studio",
    role: "Brand Designer",
    description:
      "A visual identity where the logo mark shifts 2px per day across all digital applications. After a year the mark has drifted one full screen-width from its origin. The brand accumulates its own history. No two days look identical; no update is ever broadcast.",
    images: [pic(60, 1400, 900), pic(61, 1200, 800), pic(62, 1200, 800)],
  },
  {
    slug: "ambient-ui",
    title: "Ambient UI",
    year: "2021",
    category: "UI/UX",
    client: "Research",
    role: "UX Researcher & Designer",
    description:
      "Interfaces that respond to ambient environmental data — light levels, room acoustics, and proximity — and shift their own timing accordingly. A UI that slows down in quiet rooms and accelerates in loud ones. Attention is not a setting; it is a reading.",
    images: [pic(70, 1400, 900), pic(71, 1200, 800), pic(72, 1200, 800)],
  },
  {
    slug: "echo-xr",
    title: "Echo",
    year: "2021",
    category: "XR Design",
    client: "Studio Commission",
    role: "XR Designer",
    description:
      "A virtual reality experience where every action the user takes is replayed with a 3-second delay, layered over their current movement. Users navigate a space populated by their own recent past. The work asks: when does a trace become a ghost?",
    images: [pic(80, 1400, 900), pic(81, 1200, 800), pic(82, 900, 1200)],
  },
];

export const ALL_CATEGORIES: Category[] = [
  "UI/UX",
  "XR Design",
  "Graphic Design",
  "Advertising",
  "Interaction",
];
