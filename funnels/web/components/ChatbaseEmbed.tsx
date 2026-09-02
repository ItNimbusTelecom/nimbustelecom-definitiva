"use client";

import { useEffect } from "react";
import { CHATBASE_SCRIPT_ID, type ChatbaseFunction } from "@/lib/chatbase";

export function ChatbaseEmbed() {
  useEffect(() => {
    if (window.chatbase?.("getState") === "initialized") {
      return;
    }

    if (!window.chatbase) {
      const queuedChatbase = ((...args: unknown[]) => {
        queuedChatbase.q ||= [];
        queuedChatbase.q.push(args);
      }) as ChatbaseFunction;

      window.chatbase = new Proxy(queuedChatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }

          return (...args: unknown[]) => target(prop, ...args);
        },
      });
    }

    function loadChatbase() {
      if (document.getElementById(CHATBASE_SCRIPT_ID)) {
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = CHATBASE_SCRIPT_ID;
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    }

    if (document.readyState === "complete") {
      loadChatbase();
    } else {
      window.addEventListener("load", loadChatbase, { once: true });
      return () => window.removeEventListener("load", loadChatbase);
    }
  }, []);

  return null;
}
