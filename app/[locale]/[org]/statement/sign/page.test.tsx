import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import { selectSignedStatement } from '@/lib/features/statement/statementSlice'

describe('Sign Statement', async () => {
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
        expect(screen.getByTestId("understood")).toBeDefined()
        expect(screen.getByTestId("signedName")).toBeDefined()
    })

    it('Displays error messages when fields are not complete', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mocks.push).not.toHaveBeenCalled()
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.click(screen.getByTestId('understood'))
        fireEvent.change(screen.getByTestId("signedName"), {
            target: { value: 'John Doe' }
        })

        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledOnce()
        })

        expect(mocks.push).toHaveBeenCalledWith("/statement/confirmation")

        const statement = selectSignedStatement(store.getState())
        expect(statement.understood).toBeTruthy()
        expect(statement.signedName).toEqual("John Doe")
    })
})