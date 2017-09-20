import React from 'react'
import TodoList from '../TodoList'
import client from '../../util/localStorage.js'

import './style.less'

class TodoContent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:'',
            data:[],
            time:[]
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
        this.state.time=client.fetch('time')
        return (
            <div className="todoContent">
                <div className="todoContentHead">
                    <input type="text" placeholder="something to do..." 
                        value={this.state.value} onChange={(e)=>this.changeHandle(e)} />
                    <span className="add" onClick={()=>{this.addTodo()}}></span>
                    <span className="delAll" onClick={()=>{this.delAll()}}></span>
                </div>
                <TodoList data={this.state.data} time={this.state.time} delHandle={(index)=>this.delHandle(index)} />
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
            // 保存信息
            this.state.data.unshift(this.state.value)
            client.save('message',this.state.data)
            // 保存时间
            this.state.time.unshift(this.getDate(new Date()))
            client.save('time',this.state.time)
            // 清空搜索框
            this.setState({value:''})
        }
    }
    // 删除
    delHandle(index){
        if(!confirm('Are you sure delete this?')) return;
        else{
            // 删除信息
            this.setState({data:this.state.data.splice(index,1)})
            client.save('message',this.state.data)
            // 删除时间
            this.setState({time:this.state.time.splice(index,1)})
            client.save('time',this.state.time)
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
                this.setState({time:this.state.time.splice(0,this.state.time.length)})
                client.save('time',this.state.time)
            }
        }
    }
    getDate(newDate){
        let setDate=newDate;
        let year=setDate.getFullYear();
        let month=(setDate.getMonth()+1)<10?'0'+(setDate.getMonth()+1):(setDate.getMonth()+1);
        let date=setDate.getDate()<10?'0'+setDate.getDate():setDate.getDate();
        let hour=setDate.getHours()<10?'0'+setDate.getHours():setDate.getHours();
        let minute=setDate.getMinutes()<10?'0'+setDate.getMinutes():setDate.getMinutes();
        let second=setDate.getSeconds()<10?'0'+setDate.getSeconds():setDate.getSeconds();
        let time=`${year}-${month}-${date} ${hour}:${minute}:${second}`;
        return time;
    }
}

export default TodoContent