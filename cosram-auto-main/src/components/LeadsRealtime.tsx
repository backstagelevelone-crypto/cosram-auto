"use client";

import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LeadsRealtime() {
  useEffect(() => {
    console.log("Realtime pornit");

    const channel = supabaseBrowser
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          console.log("Realtime:", payload);
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  return null;
}
