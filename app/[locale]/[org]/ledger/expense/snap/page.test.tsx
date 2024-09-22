import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { BenefitsState, selectBenefits, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { IncomeItem, addIncome } from '@/lib/features/ledger/income/incomeSlice'
import TestWrapper from '@/app/TestWrapper'

describe('SNAP Recommend Deduction Screen', async () => {
    let store: EnhancedStore
    const mocks = vi.hoisted(() => ({
        push: vi.fn(),
    }))

    vi.mock('@/hooks/approuter', () => ({
        useAppRouter: () => ({
            push: mocks.push,
        }),
    }))

    beforeEach(() => {
        store = makeStore()
        const benefits: BenefitsState = {
            deductionAmount: 50,
            snap: true,
            standardDeduction: false,
            medicaid: true,
        }
        store.dispatch(setBenefits(benefits))

        const incomeItem: IncomeItem = {
            amount: 100,
            name: "Suzy",
            description: "Yardwork",
        }
        store.dispatch(addIncome(incomeItem))
        render(<TestWrapper store={store}><Page /></TestWrapper>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('snap_deduction_header')).toBeDefined()
    })

    it('navigates to review screen if take deduction selected', async () => {
        const radio: HTMLInputElement = screen.getByTestId("take_deduction_radio")
        fireEvent.click(screen.getByText(/Take the standard deduction/i))
        waitFor(() => {
            expect(radio.checked).toEqual(true)
        })
        fireEvent.click(screen.getByTestId("continue-button"))


        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledOnce()
        })

        expect(mocks.push).toHaveBeenCalledWith("/ledger/review")

        const benefits = selectBenefits(store.getState())
        expect(benefits.standardDeduction).toBeTruthy()
    })
})