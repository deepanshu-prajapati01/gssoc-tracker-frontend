import Script from "next/script";
import constantSEO from "./constantSEO";

export default function GoogleAnalytics() {
    const googleAnalyticsToken = constantSEO.googleAnalyticsToken
    return (
        <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsToken}`} async></Script>
            <Script strategy="afterInteractive" id="google-analytics">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsToken}');
        `}
            </Script>
        </>
    )
}