"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/company";
import { useCookieConsent } from "@/components/CookieBanner";

export default function AnalyticsLoader() {
  const consent = useCookieConsent();

  useEffect(() => {
    if (!consent?.timestamp) return;

    if (consent.marketing && META_PIXEL_ID) {
      if (!document.getElementById("meta-pixel")) {
        const script = document.createElement("script");
        script.id = "meta-pixel";
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    }

    if (consent.analytics && GA_MEASUREMENT_ID) {
      if (!document.getElementById("ga4-script")) {
        const script = document.createElement("script");
        script.id = "ga4-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        const inline = document.createElement("script");
        inline.id = "ga4-inline";
        inline.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `;
        document.head.appendChild(inline);
      }
    }
  }, [consent]);

  return null;
}
