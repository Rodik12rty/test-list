import { MyButton } from "../UI/button/MyButton";
import { User } from "../User/User";


export const Flat = ({flat, setActiveFlat, users, setClientFormFlatId, getItemUsers}) => {
    return (
        <div>
            <div onClick={() => {getItemUsers(flat.id); setActiveFlat(flat)}} style={{display: 'flex', justifyContent: 'space-between'}} >
                <div>
                    {flat.id}. Квартира -- {flat.name}
                </div>

                <MyButton onClick={() => {setActiveFlat(flat); setClientFormFlatId(flat.id)}}>addClient</MyButton>

                
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
