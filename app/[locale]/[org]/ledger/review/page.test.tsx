import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('Review Screen', async () => {
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

    it('shows header', () => {
        expect(screen.getByTestId('review-header')).toBeDefined()
    })

    it('shows continue button', () => {
        expect(screen.getByTestId('continue-button')).toBeDefined()
    })

    it('Clicking button navigates', () => {
        fireEvent.click(screen.getByTestId('continue-button'))

        expect(mocks.push).toHaveBeenCalledOnce()
        expect(mocks.push).toHaveBeenCalledWith("/statement/sign")
    })
})