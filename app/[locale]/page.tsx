"use client"

import config from "@/config/appconfig.json"
import Link from "next/link"
import VerifyNav from "../components/VerifyNav"
import { GridContainer } from "@trussworks/react-uswds"

export default function Home() {
    const items = config.organizations.map((org) => {
        return (<li key={org.urlKey}>
            <Link href={org.urlKey}>{org.name}</Link>
        </li>)
    })
    return (
        <div>
            <VerifyNav title="" />
            <div className="usa-section">
                <GridContainer>
                    <h1>Organizations</h1>
                    <br />
                    <ul>{items}</ul>
                </GridContainer>
            </div>
        </div>
    )
}