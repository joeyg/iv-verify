"use client"

import config from "@/config/appconfig.json"
import Link from "next/link"
import { GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"

export default function Home() {
    const { t } = useTranslation()

    const items = config.organizations.map((org) => {
        return (<li key={org.urlKey}>
            <Link href={org.urlKey}>{org.name}</Link>
        </li>)
    })
    return (
        <div>
            <div className="usa-section">
                <GridContainer>
                    <h1>{t('landing_organizations')}</h1>
                    <br />
                    <ul>{items}</ul>
                </GridContainer>
            </div>
        </div>
    )
}