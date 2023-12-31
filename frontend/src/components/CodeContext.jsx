import React, { createContext, useContext, useState } from "react";

const CodeContext = createContext();

export const Codeprovider = ({ children }) => {
    const [theme, settheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
    const [contextusername, setcontextusername] = useState("")
    const [logedin, setlogedin] = useState(false)
    const [topic, settopic] = useState("all")
    const [topic_id, settopic_id] = useState()
    const [course_id, setcourse_id] = useState()

    const value = {
        theme,
        settheme,
        contextusername,
        setcontextusername,
        logedin,
        setlogedin,
        topic,
        settopic,
        topic_id,
        settopic_id,
        course_id,
        setcourse_id
    }

    return <CodeContext.Provider value={value}>
        {children}
    </CodeContext.Provider>
}

const themehook = () => {
    const context = useContext(CodeContext);
    return context
}

export default themehook