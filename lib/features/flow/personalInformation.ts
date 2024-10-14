import { RootState } from "@/lib/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Address {
    address1: string
    address2?: string
    city: string
    zip: number
    state: string
}

export interface PersonalInformationState {
    fullName: string
    homeAddress: Address
    mailingAddress: Address
    phoneNumber: string
}

export const initialState: PersonalInformationState = {
    fullName: '',
    homeAddress: {
        address1: '',
        city: '',
        zip: 0,
        state: '',
    },
    mailingAddress: {
        address1: '',
        city: '',
        zip: 0,
        state: '',
    },
    phoneNumber: '',
}

export const personalInfromationSlice = createSlice({
    name: 'personalInformation/set',
    initialState,
    reducers: {
        setPersonalInformation: (state, action: PayloadAction<PersonalInformationState>) => {
            state = action.payload
        }
    }
})

export const { setPersonalInformation, } = personalInfromationSlice.actions
export const selectPersonalInformation = (state: RootState) => state.personalInformation

export default personalInfromationSlice.reducer
