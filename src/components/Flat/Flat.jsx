import { MyButton } from "../UI/button/MyButton";
import { User } from "../User/User";


export const Flat = ({flat, setActiveFlat, users, setClientFormFlatId, getItemUsers}) => {
    return (
        <div onClick={() => {getItemUsers(flat.id); setActiveFlat(flat)}} >
            {flat.id}. Квартира -- {flat.name}

            <MyButton onClick={() => {setActiveFlat(flat); setClientFormFlatId(flat.id)}}>addClient</MyButton>

            {users && Array.isArray(users[String(flat.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {users[flat.id].map(user =>
                        <User key={user.id} user={user} />
                    )}
                </div>
            }
        </div>
    )
}
