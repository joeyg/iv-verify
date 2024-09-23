'use client'

import FlowStepIndicator from "@/app/components/FlowStepIndicator";
import VerifyNav from "@/app/components/VerifyNav";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

export default function Page() {
    const { t } = useTranslation()

    return (
        <div>
            <VerifyNav title={t('personal_information_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <FlowStepIndicator />

                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}