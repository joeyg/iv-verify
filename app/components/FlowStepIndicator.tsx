"use client"

import { useAppConfig } from "@/hooks/appconfig";
import { selectFlowStage } from "@/lib/features/flow/flowSlice";
import { useAppSelector } from "@/lib/hooks";
import { StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

export default function FlowStepIndicator () {
    const { sections } = useAppConfig()
    const { t } = useTranslation()
    const currentStage = useAppSelector(state => selectFlowStage(state))

    let foundCurrentStep = false
    const steps = sections.map((section) => {
        let status = foundCurrentStep ? "incomplete" : "complete"
        if (section.key === currentStage) {
            foundCurrentStep = true
            status = "current"
        }
        
        return (<StepIndicatorStep
            label={t(`${section.key}_step_title`)}
            key={section.key}
            status={status}
        />)
    })
    return (
        <StepIndicator
            counters="small"
            headingLevel="h2"
            ofText={t('of')}
            stepText={t('step')}
        >
            {steps}
        </StepIndicator>
    )
}