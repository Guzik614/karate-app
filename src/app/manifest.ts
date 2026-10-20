import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kyokushin Dojo",
    short_name: "Kyokushin",
    description: "Nauka karate Kyokushin: techniki wideo, programy treningowe i wiedza.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0c0a09",
    theme_color: "#c8102e",
    lang: "pl",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
