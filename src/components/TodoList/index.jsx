import React from 'react'
import client from '../../util/localStorage.js'

import './style.less'

class TodoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            time:[]
        }
    }
    render(){
        this.state.data=this.props.data
        this.state.time=this.props.time
        let todo=this.state.data.map((item,index)=>{
            return (
                <div key={index}>
                    <p>{item}</p>
                    <span className="time">{this.state.time[index]}</span>
                    <span className="del" data-index={index} onClick={(e)=>this.delHandle(e)}></span>
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