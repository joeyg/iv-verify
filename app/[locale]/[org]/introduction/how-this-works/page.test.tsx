import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('How this works page', async () => {
  let store: EnhancedStore;
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
    expect(screen.getByTestId('how_this_works_header')).toBeDefined()
  })

  it('navigates when clicked', async () => {
    fireEvent.click(screen.getByTestId('get_started_button'))
    await waitFor(() => {
      expect(mocks.push).toHaveBeenCalledOnce()
    })

    expect(mocks.push).toHaveBeenCalledWith("/introduction/benefits/")
  })
})