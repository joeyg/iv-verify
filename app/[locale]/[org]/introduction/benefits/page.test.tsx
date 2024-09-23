import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import { selectBenefits } from '@/lib/features/benefits/benefitsSlice'

describe('Choose Benefits', async () => {
    let store: EnhancedStore
    const mocks = vi.hoisted(() => ({
        advanceFlow: vi.fn(),
    }))

    vi.mock('@/hooks/approuter', () => ({
        useAppRouter: () => ({
            advanceFlow: mocks.advanceFlow,

        }),
    }))
    beforeEach(() => {
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(() => {
        cleanup()
        mocks.advanceFlow.mockClear()
    })

    it('Shows Inputs', async () => {
        expect(screen.getByTestId("medicaid")).toBeDefined()
        expect(screen.getByTestId("snap")).toBeDefined()
    })

    it('Displays error messages when no checkbox is selected', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(mocks.advanceFlow).not.toHaveBeenCalledOnce()
    })

    it('Navigates when just medicaid checkbox is checked', async() => {
        const checkbox = screen.getByTestId('medicaid') as HTMLInputElement
        fireEvent.click(checkbox)
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mocks.advanceFlow).toHaveBeenCalledOnce()
        })
        expect(checkbox.checked).toBeTruthy()
        
        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeTruthy()
        expect(benefits.snap).toBeFalsy()
    })

    it('Navigates when just snap checkbox is checked', async() => {
        const checkbox = screen.getByTestId('snap') as HTMLInputElement
        fireEvent.click(checkbox)
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mocks.advanceFlow).toHaveBeenCalledOnce()
        })


        expect(checkbox.checked).toBeTruthy()
        
        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeFalsy()
        expect(benefits.snap).toBeTruthy()
    })

    it('Navigates when two checkboxes are checked', async () => {
        fireEvent.click(screen.getByTestId('medicaid'))
        fireEvent.click(screen.getByTestId('snap'))
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mocks.advanceFlow).toHaveBeenCalledOnce()
        })

        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeTruthy()
        expect(benefits.snap).toBeTruthy()
    })
})