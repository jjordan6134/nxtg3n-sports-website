import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXTG3N Sports",
    short_name: "NXTG3N",
    description: "The Neural Athlete platform for athlete development, NIL strategy, education, and brand growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0E11",
    theme_color: "#0B0E11",
    icons: [
      {
        src: "/nxtg3n-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
