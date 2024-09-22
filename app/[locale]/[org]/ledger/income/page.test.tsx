import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('Income Landing Screen', async () => {
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
        expect(screen.getByTestId('income_landing_what_counts_heading')).toBeDefined()
    })

    it('shows add button', () => {
        expect(screen.getByTestId('add_income_button')).toBeDefined()
    })
})