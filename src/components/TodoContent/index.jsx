import React from 'react'
import TodoList from '../TodoList'
import client from '../../util/localStorage.js'

import './style.less'

class TodoContent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:'',
            data:[]
        }
    }
    componentDidMount(){ 
        // 回车添加
        let _this=this;
        document.addEventListener('keyup',function(e){
            if(e.keyCode===13){
                _this.addTodo()
            }
        })
    }
    render(){
        this.state.data=client.fetch('message')
        return (
            <div className="todoContent">
                <div className="todoContentHead">
                    <input type="text" placeholder="something to do..." 
                        value={this.state.value} onChange={(e)=>this.changeHandle(e)} />
                    <button onClick={()=>{this.addTodo()}}>add</button>
                    <button onClick={()=>{this.delAll()}}>deleteAll</button>
                </div>
                <TodoList data={this.state.data} delHandle={(index)=>this.delHandle(index)} />
            </div>
        )
    }
    changeHandle(e){
        this.setState({value:e.target.value})
    }
    // 添加
    addTodo(){
        if(this.state.value===''){
            alert('please input content!')
        }else{
            this.state.data.unshift(this.state.value)
            client.save('message',this.state.data)
            this.setState({value:''})
        }
    }
    // 删除
    delHandle(index){
        if(!confirm('Are you sure delete this?')) return;
        else{
            this.setState({data:this.state.data.splice(index,1)})
            client.save('message',this.state.data)
        }
    }
    // 删除全部
    delAll(){
        if(this.state.data.length<=0) alert('nothing can be deleted!')
        else{
            if(!confirm('Are you sure delete all?')) return;
            else{
                this.setState({data:this.state.data.splice(0,this.state.data.length)})
                client.save('message',this.state.data)
            }
        }
    }
}

export default TodoContent