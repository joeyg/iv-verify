'use client'

import FlowStepIndicator from "@/app/components/FlowStepIndicator";
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation";
import VerifyNav from "@/app/components/VerifyNav";
import { useAppConfig } from "@/hooks/appconfig";
import { selectPersonalInformation, setPersonalInformation } from "@/lib/features/flow/personalInformation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Form, FormGroup, Grid, GridContainer } from "@trussworks/react-uswds";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const orgConfig = useAppConfig()
    const sectionConfig = orgConfig.sections.find(section => section.key === "personalInformation")
    const personalInformation = useAppSelector((state) => selectPersonalInformation(state))
    

    const {
        register,
        control,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues: { 
        fullName: personalInformation.fullName,
     }})
    
    function onSubmit(data) {
        console.log(data)
        const homeAddress = {
            address1: data['homeAddress_address1'],
            address2: data['homeAddress_address2'],
            city: data['homeAddress_city'],
            zip: data['homeAddress_zip'],
            state: data['homeAddress_state']
        }

        const mailingAddress = {
            address1: data['mailingAddress_address1'],
            address2: data['mailingAddress_address2'],
            city: data['mailingAddress_city'],
            zip: data['mailingAddress_zip'],
            state: data['mailingAddress_state']
        }

        dispatch(setPersonalInformation({
            fullName: data.fullName,
            homeAddress,
            mailingAddress,
            phoneNumber: data.phoneNumber,
        }))
    }

    function inputField(fieldName: any) {
        return (
            <FormGroup>
                <TextFieldWithValidation 
                    id={fieldName}
                    label={t(`personal_information_${fieldName}`)}
                    {...register(fieldName, {required:{value: true, message: t(`personal_information_${fieldName}_required`)}})}
                    error={errors[fieldName]?.message}
                    data-testid={fieldName}
                    requiredMarker
                />
            </FormGroup>
        )
    }

    function addressInput(fieldName: any) {
        return (
            <div>
                <h3>{t(`personal_information_${fieldName}_header`)}</h3>
                <FormGroup>
                    <TextFieldWithValidation
                        id={`${fieldName}_address1`}
                        label={t('personal_information_address1')}
                        {...register(`${fieldName}_address1`, {required:{value: true, message: t(`personal_information_address1_required`)}})}
                        error={errors[`${fieldName}_address1`]?.message}
                        data-testid={`${fieldName}_address1`}
                        requiredMarker />
                </FormGroup>
                <FormGroup>
                    <TextFieldWithValidation
                        id={`${fieldName}_address2`}
                        label={t('personal_information_address2')}
                        {...register(`${fieldName}_address2`, {required:false})}
                        error={errors[`${fieldName}_address2`]?.message}
                        data-testid={`${fieldName}_address2`} />
                </FormGroup>
                <FormGroup>
                    <TextFieldWithValidation
                        id={`${fieldName}_city`}
                        label={t('personal_information_city')}
                        {...register(`${fieldName}_city`, {required:{value: true, message: t(`personal_information_city_required`)}})}
                        error={errors[`${fieldName}_city`]?.message}
                        data-testid={`${fieldName}_city`} 
                        requiredMarker />
                </FormGroup>
            </div>
        )
    }

    function asksFor(fieldName: string) {
        return sectionConfig?.questions.find(question => question === fieldName)
    }

    return (
        <div>
            <VerifyNav title={t('personal_information_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <FlowStepIndicator />
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {asksFor('fullName') && inputField('fullName')}
                                {asksFor('homeAddress') && addressInput('homeAddress')}
                                <Button type="submit" data-testid="continue_button">{t('continue')}</Button>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}