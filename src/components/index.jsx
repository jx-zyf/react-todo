import React from 'react'
import './index.less'

import TodoHeader from './TodoHeader'
import TodoContent from './TodoContent'

class App extends React.Component{
    render(){
        return (
            <div className="todoWrap">
                <TodoHeader />
                <TodoContent />
            </div>
        )
    }
}

export default App