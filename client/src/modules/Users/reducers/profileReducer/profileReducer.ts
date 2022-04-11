import { Reducer } from "react";
import { User } from "../../types";
import { ChangeProfileInput, SetEditMode, SetProfileData } from "./types";

export interface ProfileState {
    user: User | null
    editMode: boolean
}

export enum ProfileActionType {
    SetData = 'SetData',
    ChangeInput = 'ChangeInput',
    SetEditMode = 'SetEditMode'
}

export const profileInitState: ProfileState = {
    user: null,
    editMode: false
}

export type ProfileAction =
| SetProfileData
| ChangeProfileInput
| SetEditMode

export const profileReducer: Reducer<ProfileState, ProfileAction> = (state, action) => {
    switch (action.type) {
        case ProfileActionType.SetData:
            return {
                ...state,
                user: action.payload
            }
        case ProfileActionType.ChangeInput:
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        [action.payload.name]: action.payload.value
                    }
                }
            }
            return state
        case ProfileActionType.SetEditMode:
            return {
                ...state,
                editMode: !state.editMode
            }
        default:
            return state
    }
}