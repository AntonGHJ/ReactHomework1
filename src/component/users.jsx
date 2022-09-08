import React, {useState} from "react";
import api from '../api'

const Users = ()=> {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (id) => {
        setUsers(prevState=>prevState.filter(user=>user!==id))        
    }
    
    const renderPhrase = () => {        
        if (users.length > 4 && users.length <= 12)
        {return (
         <span className="badge m-2 bg-primary">{users.length} человек тусанут с тобой</span>
         )
        }
        if (users.length > 1 && users.length < 5) {return (
        <span className="badge m-2 bg-primary">{users.length} человека тусанет с тобой</span>
    )}
        if (users.length === 1) {return <span className="badge m-2 bg-primary">{users.length} человек тусанет с тобой</span>}
        else {
            return <span className="badge m-2 bg-warning">Никто не тусанет с тобой</span>
        }
    }

    const renderUser = () => { 
        
        return (
        users.map(user=> 
                        
            { return (
            <>
                <tr>
                    <td>{user.name}</td>
                    <td>{
                    user.qualities.map((item) => {
                        return <span className={'badge bg-' + item.color}>{item.name}</span>;
                      })}
                    
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td>
                    <button className="btn btn-danger btn-sm m-2" onClick={()=>handleDelete(user)}>
                    Удалить
                    </button>
                    </td>
                </tr>                
            </>
            
            )}
        ))
    }
        
    const [tableHead, setTableHead] = useState(['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка'])
    if (users.length > 0)
        { return (  
        <>        
        <span>{renderPhrase()}</span>        
        <table className="table m-2">        
    <thead>    
      <tr>
        {
        tableHead.map(thead=>(<th>{thead}</th>))
        }
        </tr>        
    </thead>
    <tbody>
        {renderUser()}
    </tbody>
  </table>
  </>
  )  
}
    if (users.length === 0) {return (    
    <span>{renderPhrase()}</span>    
    )}
}


export default Users