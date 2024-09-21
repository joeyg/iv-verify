"use config"

import { useRouter } from "next/navigation"
import { useAppConfig } from "./appconfig"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function useAppRouter() {
    const router = useRouter()
    const config = useAppConfig()

    function push(href: string, options?: NavigateOptions) {
        const key = config.urlKey
        return router.push(`${key}/${href}`, options)
    }

    return {
        ...router,
        push,
    }
}