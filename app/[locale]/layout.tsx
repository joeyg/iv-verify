import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider  from '@/app/StoreProvider'
import "./globals.css";
import GovernmentBanner from "@/app/components/GovernmentBanner";
import InitialStateLoader from "@/app/InitialStateLoader";
import TranslationsProvider from "../TranslationsProvider";
import { i18nConfig } from "@/app/constants";
import USWDSInclude from "../components/USWDSInclude";
import config from "@/config/appconfig.json"
import { ConfigFile } from "@/hooks/appconfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Verify.gov",
};

export function generateStaticParams() {
    const configFile: ConfigFile = config

    console.log(i18nConfig.locales.map((locale) => {
        return configFile.organizations.map((org) => ({
            locale,
            org: org.urlKey,
        }))
    }).flat())
    return i18nConfig.locales.map((locale) => {
        return configFile.organizations.map((org) => ({
            locale,
            org: org.urlKey,
        }))
    }).flat()
}

function RootLayout({
    children,
    params
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
    return (
        <html lang={params.locale}>
            <USWDSInclude />
            <body className={inter.className}>
                <StoreProvider>
                    <InitialStateLoader>
                        <TranslationsProvider locale={params.locale}>
                            <GovernmentBanner />
                            {children}
                        </TranslationsProvider>
                    </InitialStateLoader>
                </StoreProvider>
            </body>
        </html>
    );
}

export default RootLayout