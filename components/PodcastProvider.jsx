"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { episodes } from "@/data/ecole";
import PodcastBar from "./PodcastBar";

const PodcastContext = createContext(null);

export function usePodcast() {
  return useContext(PodcastContext);
}

// Pages where the control bar is hidden (audio keeps playing, just no UI).
const HIDDEN_ON = ["/candidature"];

/**
 * Global podcast player. Lives in the root layout so it stays mounted across
 * client-side navigations — the audio keeps playing and the control bar stays
 * pinned at the bottom on every page. Pages trigger playback via usePodcast().
 */
export default function PodcastProvider({ children }) {
  const [index, setIndex] = useState(null);
  const pathname = usePathname();
  const hidden = HIDDEN_ON.includes(pathname);

  // Reserve space at the bottom so the fixed bar never hides the footer — but
  // only where the bar is actually shown.
  useEffect(() => {
    const active = index != null && !hidden;
    document.body.classList.toggle("podcast-active", active);
    return () => document.body.classList.remove("podcast-active");
  }, [index, hidden]);

  const value = {
    index,
    play: (i) => setIndex(i),
    close: () => setIndex(null),
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
      <PodcastBar
        episodes={episodes}
        index={index}
        hidden={hidden}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
      />
    </PodcastContext.Provider>
  );
}
