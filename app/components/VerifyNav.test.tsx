import { beforeEach, describe, expect, it, Mock, vi } from "vitest"
import VerifyNav from "./VerifyNav"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { i18nConfig } from "../constants"
import { afterEach } from "node:test"

describe('VerifyNav', () => {
    interface Mocks {
        push: Mock
        refresh: Mock
        cookiesSpy: Mock
        changeLanguageSpy: Mock
    }

    const mocks:Mocks = vi.hoisted(() => ({
        push: vi.fn(),
        refresh: vi.fn(),
        cookiesSpy: vi.fn(),
        changeLanguageSpy: vi.fn(),
    }))

    vi.mock('@/hooks/approuter', () => ({
        useAppRouter: () => ({
            push: mocks.push,
            asPath: "/",
            refresh: mocks.refresh
        }),
    }))

    vi.mock('next/navigation', () => ({
        usePathname: vi.fn().mockReturnValue('/')
    }))


    vi.mock('react-i18next', () => ({
        useTranslation: () => ({
            t: (str: string) => str,
            i18n: {
              changeLanguage: mocks.changeLanguageSpy,
              language: 'en',
            }
        })
    }))

    vi.mock('react-cookie', () => ({
        useCookies: () => ([vi.fn(), mocks.cookiesSpy])
    }))

    afterEach(() => {
        cleanup()
        for (const key of Object.keys(mocks)) {
            mocks[key as keyof Mocks].mockClear()
        }
    })

    render(<VerifyNav title={"MY TITLE"} />)

    it('renders', () => {
        expect(screen.getByText("MY TITLE")).toBeDefined()
    })

    describe('changing locale to es', () => {
        fireEvent.click(screen.getByTestId("locale-es"))

        it('calls change language', () => {
            expect(mocks.changeLanguageSpy).toHaveBeenCalledOnce()
            expect(mocks.changeLanguageSpy).toHaveBeenCalledWith('es')
        })

        it('pushes new route', () => {
            expect(mocks.push).toHaveBeenCalledOnce()
            expect(mocks.push).toHaveBeenCalledWith('/es//')
        })

        it('refreshes router', () => {
            expect(mocks.refresh).toHaveBeenCalledOnce()
        })

        it('sets cookie', () => {
            expect(mocks.cookiesSpy).toHaveBeenCalledOnce()
            expect(mocks.cookiesSpy).toHaveBeenCalledWith(i18nConfig.cookieName, 'es')
        })
    })
})