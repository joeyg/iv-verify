import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('Expense Landing Screen', async () => {
    let store: EnhancedStore
    vi.mock('@/hooks/approuter', () => ({
        useAppRouter: () => ({
            push: vi.fn(),
        }),
    }))

    beforeEach(() => {
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })

    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('expenses_landing_what_counts_heading')).toBeDefined()
    })

    it('shows add button', () => {
        expect(screen.getByTestId('add_expenses_button')).toBeDefined()
    })

    it('shows summary button', () => {
        expect(screen.getByTestId('no_expenses_link')).toBeDefined()
    })
})