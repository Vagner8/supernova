import { useReducer } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { Header } from './Header/Header'
import { initialState, reducer } from './reducer'
import { UseUserContext } from './types'
import styles from './Users.module.sass'

export function Users() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className={styles.Users}>
            <Header actionlist={state.actionlist}/>
            <Outlet context={{ dispatch, state }}/>
        </div>
    )
}

export function useUserContext() {
    return useOutletContext<UseUserContext>()
}