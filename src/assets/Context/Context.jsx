import { createContext, useState } from "react";

const Context = createContext()

function Provider({children}){
    const [number, setNumber] = useState(0)
    const [page, setPage] = useState('')
    const [userData, setUserData] = useState([])


    return(
        <Context.Provider value={{number, setNumber, page, setPage, userData, setUserData}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}