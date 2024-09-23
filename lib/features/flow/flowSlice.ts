import { RootState } from "@/lib/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FlowState {
    currentStage: string
}

export const initialState: FlowState = {
    currentStage: 'intro'
}

export const flowSlice = createSlice({
    name: 'statement/set',
    initialState,
    reducers: {
        setFlowStage: (state, action: PayloadAction<string>) => {
            state.currentStage = action.payload
        }
    }
})

export const { setFlowStage, } = flowSlice.actions
export const selectFlowStage = (state: RootState) => state.flow.currentStage

export default flowSlice.reducer
