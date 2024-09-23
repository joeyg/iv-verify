"use config"

import { useRouter } from "next/navigation"
import { Section, useAppConfig } from "./appconfig"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { selectFlowStage, setFlowStage } from "@/lib/features/flow/flowSlice"
import { useAppSelector } from "@/lib/hooks"
import { useDispatch } from "react-redux"

export function useAppRouter() {
    const router = useRouter()
    const config = useAppConfig()
    const dispatch = useDispatch()
    const currentStage = useAppSelector(state => selectFlowStage(state))

    function push(href: string, options?: NavigateOptions) {
        const key = config.urlKey
        return router.push(`/${key}/${href}`, options)
    }

    function urlPathForSection(section: Section) {
        switch (section.key) {
            case "household":
            case "personalInformation":
                return section.key
        }

        return ""
    }

    function advanceFlow() {
        let section: Section
        if (currentStage === "intro") {
            dispatch(setFlowStage(config.sections[0].key))
            section = config.sections[0]
        } else {
            let s = config.sections.find((section: Section) => section.key === currentStage)
            if (s) {
                section = s
            } else {
                console.error("Unable to find next section")
                return
            }
        }

        dispatch(setFlowStage(section.key))
        const path = urlPathForSection(section)
        push(`/flow/${path}`)
    }

    return {
        ...router,
        push,
        advanceFlow,
    }
}