"use client"
import { useParams } from "next/navigation";
import config from "@/config/appconfig.json"

export interface ConfigFile {
    organizations: OrgConfig[]
}

export interface Section {
    key: string,
    questions: string[]
}

export interface OrgConfig {
    name: string
    urlKey: string
    benefits: string[]
    sections: Section[]
}

export function useAppConfig(): OrgConfig {
    const params = useParams()
    const configFile: ConfigFile = config
    const orgConfig = configFile.organizations.find((orgConfig) => orgConfig.urlKey == params.org)

    if (!orgConfig) {
        throw `Error finding organization ${params.org}`
    }

    return orgConfig
}