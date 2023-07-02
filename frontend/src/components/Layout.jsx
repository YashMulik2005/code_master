import React from 'react'
import Topic from './Topic'
import Home from '../Home'
import Compiler from '../compiler/Compiler'

function Layout() {
    return (
        <div>
            <Topic />
            <Home />
            <Compiler />
        </div>
    )
}

export default Layout