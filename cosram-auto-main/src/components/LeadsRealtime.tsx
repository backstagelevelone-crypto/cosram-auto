"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LeadsRealtime() {
  const router = useRouter();

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

          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [router]);

  return null;
}
