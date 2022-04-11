import { User } from "../../types"
import { ProfileActionType } from "./profileReducer"

export interface SetProfileData {
    type: ProfileActionType.SetData
    payload: User
}

export interface ChangeProfileInput {
    type: ProfileActionType.ChangeInput
    payload: {name: string, value: string}
}

export interface SetEditMode {
    type: ProfileActionType.SetEditMode
}