'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, ButtonGroup, AccordionItemProps, Card, CardBody, CardHeader, Grid, GridContainer, Label, TextInput, ModalRef, Accordion } from '@trussworks/react-uswds' 
import { useTranslation } from '../../i18n/client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import Link from 'next/link'

const DAY_COUNT = 30

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()

    const testItems: AccordionItemProps[] = [
        {
          title: t('expenses_landing_what_counts_heading'),
          content: (
            <div>
              {t('expenses_landing_what_counts_body')}
              <p className="margin-top-3">{t('expenses_landing_what_counts_list_header')}</p>
              <ul className="margin-left-4">
                <li>{t('expenses_landing_what_counts_list_one')}</li>
                <li>{t('expenses_landing_what_counts_list_two')}</li>
                <li>{t('expenses_landing_what_counts_list_three')}</li>
                <li>{t('expenses_landing_what_counts_list_four')}</li>
                <li>{t('expenses_landing_what_counts_list_five')}</li>
                <li>{t('expenses_landing_what_counts_list_six')}</li>
              </ul>
            </div>
          ),
          expanded: true,
          id: 'expenses_landing_what_counts',
          headingLevel: 'h4',
        }, {
            title: t('expenses_landing_need_heading'),
            content: (
                <p>
                    {t('expenses_landing_need_body')}
                </p>
            ),
            expanded: true,
            id: 'expenses_landing_need',
            headingLevel: 'h4',
        }
    ]

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('expenses_landing_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3 className="margin-bottom-2">{t('expenses_landing_heading')}</h3>
                            <span className="usa-hint">{t('expenses_landing_subheading')}</span>
                            <Accordion multiselectable={true} items={testItems} className="margin-top-3 margin-bottom-3" />
                            <p className="text-center">
                                <Button type="button" className="margin-bottom-3">{t('expenses_landing_add_button')}</Button>
                                <br />
                                <Link href="/ledger/expenses/summary" className="usa-link">{t('expenses_landing_do_not_have_link')}</Link>
                            </p>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}