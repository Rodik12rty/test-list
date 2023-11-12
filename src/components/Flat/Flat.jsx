import { MyButton } from "../UI/button/MyButton";
import { User } from "../User/User";


export const Flat = ({flat, setActiveFlat, users, setClientFormFlatId, getItemUsers}) => {

    return (
        <div>
            <div onClick={(e) => {getItemUsers(flat.id); setActiveFlat(flat); e.stopPropagation()}} style={{display: 'flex', justifyContent: 'space-between'}} >
                <div>
                    {flat.id}. Квартира -- {flat.name}
                </div>
                <MyButton onClick={(e) => {setActiveFlat(flat); setClientFormFlatId(flat.id); e.stopPropagation()}}>addClient</MyButton>        
            </div>
            <div>
                {users && Array.isArray(users[String(flat.id)]) &&
                    <div style={{marginLeft: '10px'}}>
                        {users[flat.id].map(user =>
                            <User key={user.id} user={user} />
                        )}
                    </div>
                }
            </div>
        </div>
    )

}
