import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import FlowStepIndicator from "./FlowStepIndicator";
import { cleanup, render, screen } from "@testing-library/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import * as matchers from '@testing-library/jest-dom/matchers';
import { setFlowStage } from "@/lib/features/flow/flowSlice";

describe('FlowStepIndicator', () => {
    let store: EnhancedStore
    expect.extend(matchers);
    
    vi.mock('@/hooks/appconfig', () => ({
        useAppConfig: () => ({
            sections: [
                {key: 'personalInformation', questions: []},
                {key: 'household', questions: []},
                {key: 'income', questions: []},
                {key: 'expenses', questions: []},
                {key: 'healthcare', questions: []},
            ],
        }),
    }))

    beforeEach(() => {
        store = makeStore()
        store.dispatch(setFlowStage('household'))
        render (<Provider store={store}><FlowStepIndicator /></Provider>)
    })
    afterEach(() => {
        cleanup()
    })

    test('displays steps', () => {
        expect(screen.getAllByRole('listitem').length).toBe(5)
    })

    test('sets current item', () => {
        expect(screen.getByRole('listitem', { current: true })).toHaveClass('usa-step-indicator__segment usa-step-indicator__segment--current')
    })
})