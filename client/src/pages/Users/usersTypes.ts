import { ReactElement } from "react"
import { DropdownItem } from "../../reducers/usersReducer/usersReducerTypes"

export interface ChangeCheckbox {
    (id: string): () => void
}

export interface ClickDropdown {
    (action: DropdownItem['action']): () => void
}

export interface Content {
    Preloader: ReactElement
    Table: ReactElement
}