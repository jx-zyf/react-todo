import React from 'react'
import client from '../../util/localStorage.js'

import './style.less'

class TodoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    render(){
        this.state.data=this.props.data;
        let todo=this.state.data.map((item,index)=>{
            return (
                <div key={index}>
                    <p>{item}</p>
                    <a href="javascript:;" data-index={index} onClick={(e)=>this.delHandle(e)}>delete</a>
                </div>
            )
        })
        return (
            <div className="todos">
                {todo}
            </div>
        )
    }
    delHandle(e){
        let index=e.target.getAttribute('data-index')
        this.props.delHandle(index)
    }
}

export default TodoList