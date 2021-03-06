import React, { useEffect, useState } from 'react';
import {GrClose} from "react-icons/gr"

function EditTodo({todo}) {
    const [mod, setMod] = useState(true);
    const [body, setBody] = useState("")
    const [isedited, setIsedited] = useState(false);
    
    useEffect(()=>{
        setBody(todo.body) 
    },[mod]);

    async function set(e){
        e.preventDefault()
        try {
            const Rbody = {body};
            const Redit = {isedited}
            const arr = [Rbody, Redit]
            const response = await fetch(`http://localhost:4001/todos/${todo.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(arr)
            }); 
            window.location.reload()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    function Mod(){
        setMod(!mod);
        setBody(todo.body);
    }
    function sm(){
        setMod(!mod);
        setIsedited(true)
    }
    
    return (
        <div className="edit">
            
            <button onClick={sm} className="buttonEdit">Edit</button>
            <div className={mod ? "modal" : "modalF"}>
                <div className="modal-content">
                    <span onClick={Mod} className="close"><GrClose/></span>
                    <h3>body the todo</h3>
                    <input value={body} onChange={e=>setBody(e.target.value)} className="editInput" type="text" />
                    <button onClick={e => set(e)} className="bodyB">save</button>
                    
                </div>
            </div>
        </div>
    )
}

export default EditTodo
