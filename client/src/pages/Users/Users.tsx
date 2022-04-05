import { createContext, useCallback, useEffect, useReducer } from "react"
import { Header } from "../../components/Header/Header"
import { Preloader } from "../../components/Preloader/Preloader"
import { Table } from "./Table/Table"
import { FetchStatus, useFetch } from "../../hooks/useFetch"
import { initialState, usersReducer } from "../../reducers/usersReducer/usersReducer"
import { Actionlist, UsersActionTypes } from "../../reducers/usersReducer/usersReducerTypes"
import { Method, UserURL } from "../../api/apiType"
import { Content, User, UserProfileContext } from "./usersTypes"
import { fetchRequest } from "../../api/api"
import { Outlet, useOutletContext, useParams } from "react-router-dom"

const UserContext = createContext({})

export function Users() {
  const users = useFetch<User[]>(UserURL.FetchAllUsers)
  const {userId} = useParams()
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    if (users.data) {
      dispatch({ type: UsersActionTypes.SetData, payload: users.data })
    }
  }, [users.data])

  useEffect(() => {
    const amountCheckedUsers = state.users.filter(item => item.selected).length
    dispatch({ type: UsersActionTypes.ShowUsersActions, payload: amountCheckedUsers})
  }, [state.users])

  function changeCheckbox(id: string) {
    return function () {
      dispatch({ type: UsersActionTypes.SelectUsers, payload: id })
    }
  }

  function clickDropdown(action: Actionlist['action']) {
    const checkedUsers = state.users.filter(user => user.selected)
    return function () {
      if (action === 'new') {
        fetchRequest<User[]>(Method.POST, UserURL.PostUser, checkedUsers)
      }
    }
  }

  const selectUserByProfile = useCallback(function (userId: string) {
    dispatch({ type: UsersActionTypes.SelectOneUser, payload: userId })
  }, [])

  function showContent() {
    const Content: Content = {
      Preloader: <Preloader/>,
      UserProfile: <Outlet context={{selectUserByProfile}} />,
      Table: (
        <Table
          items={state.users}
          selectAllUsers={state.selectAllUsers}
          changeCheckbox={changeCheckbox}
        />
      )
    }
    if (userId) {
      return Content.UserProfile
    }
    if (users.status !== FetchStatus.Fulfilled) return Content.Preloader
    return Content.Table
  }

  return (
    <UserContext.Provider value={state}>
        <Header
          actionlist={state.actionlist}
          clickDropdown={clickDropdown}
        />
        {showContent()}
    </UserContext.Provider>
  )
}

export function useUserProfileContext() {
  return useOutletContext<UserProfileContext>()
}