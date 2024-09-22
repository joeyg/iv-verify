import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('Set Signed Statment', async () => {
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
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(() => {
        cleanup()
        mocks.push.mockClear()
    })

    it('Shows Inputs', async () => {
        expect(screen.getByTestId("name")).toBeDefined()
        expect(screen.getByTestId("amount")).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()
        expect(mocks.push).not.toHaveBeenCalled()
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.change(screen.getByTestId("name"), {
            target: { value: 'Suzy' }
        })

        for (const button of screen.getAllByTestId('date-picker-button')) {
            fireEvent.click(button)
            fireEvent.click(screen.getByText('10'))
        }

        fireEvent.change(screen.getByTestId("amount"), {
            target: { value: '23.00' }
        })

        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledOnce()
        })

        expect(mocks.push).toHaveBeenCalledWith("/statement/sign")
    })
})