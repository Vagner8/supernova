import { createContext, useEffect, useReducer } from "react"
import { Header } from "../../components/Header/Header"
import { Preloader } from "../../components/Preloader/Preloader"
import { Table } from "../../components/Table/Table"
import { useFetch } from "../../hooks/useFetch"
import { initialState, usersReducer } from "../../reducers/usersReducer/usersReducer"
import { DropdownItem, UsersActionTypes } from "../../reducers/usersReducer/usersReducerTypes"
import { UserAPI } from "../../types/apiType"
import { User } from "../../types/userType"
import { Content } from "./usersTypes"

const UserContext = createContext({})

export function Users() {
  const data = useFetch<User[]>(UserAPI.FetchAllUsers)
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    if (Array.isArray(data)) {
      dispatch({ type: UsersActionTypes.SetData, payload: data })
    }
  }, [data])

  useEffect(() => {
    const amountCheckedUsers = state.users.filter(item => item.checked).length
    dispatch({ type: UsersActionTypes.ShowDropItems, payload: amountCheckedUsers})
  }, [state.users])

  function changeCheckbox(id: string) {
    return function () {
      dispatch({ type: UsersActionTypes.Check, payload: id })
    }
  }

  function clickDropdown(action: DropdownItem['action']) {
    return function () {
      console.log(action)
    }
  }

  const Content: Content = {
    Preloader: <Preloader/>,
    Table: <Table items={state.users} changeCheckbox={changeCheckbox} />
  }

  function showContent(Content: Content) {
    if (typeof data === 'string') return Content.Preloader
    return Content.Table
  }

  return (
    <UserContext.Provider value={state}>
        <Header
          dropdownlist={state.dropdownlist}
          checkedAll={state.checkedAll}
          changeCheckbox={changeCheckbox}
          clickDropdown={clickDropdown}
        />
        {showContent(Content)}
    </UserContext.Provider>
  )
}