import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'
import TestWrapper from '@/app/TestWrapper'

describe('Add Income To Ledger Page', async () => {
    const mocks = vi.hoisted(() => ({
        push: vi.fn(),
    }))

    vi.mock('@/hooks/approuter', () => ({
        useAppRouter: () => ({
            push: mocks.push,
        }),
    }))

    beforeEach(() => {
        render (<TestWrapper><Page /></TestWrapper>)
    })
    afterEach(() => {
        cleanup()
        mocks.push.mockClear()
    })

    it('Shows Inputs', () => {
        expect(screen.getByTestId("name")).toBeDefined()
        expect(screen.getByTestId("description")).toBeDefined()
        expect(screen.getByTestId("amount")).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {
        fireEvent.change(screen.getByTestId("name"), {
            target: {
                value: ''
            }
        })
           
        fireEvent.change(screen.getByTestId("description"), {
            target: {
                value: ''
            }
        })

        fireEvent.change(screen.getByTestId("amount"), {
            target: {
                value: ''
            }
        })

        fireEvent.click(screen.getByText('Continue'))
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mocks.push).not.toHaveBeenCalledOnce()
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.change(screen.getByTestId("name"), {
            target: {
                value: 'Jane'
            }
        })
           
        fireEvent.change(screen.getByTestId("description"), {
            target: {
                value: 'Landscaping'
            }
        })

        fireEvent.change(screen.getByTestId("amount"), {
            target: {
                value: '40.00'
            }
        })

        fireEvent.click(screen.getByText('Continue'))

        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledOnce()
        })

        expect(mocks.push).toHaveBeenCalledWith("/ledger/income/list")
    })
})