import ItemService from "../../API/APIService";
import { MyButton } from "../UI/button/MyButton"


export const User = ({user, getItemUsers, flat}) => {

    const removeClientInFlat = async (clientId, flatId) => {
        try {
            const userRemoveResponse = await ItemService.removeUser(clientId);
        } catch (error) {
            console.log("Something went wrong", error)
        }
        getItemUsers(flatId);
    }


    return (
        <div key={user.id}>
            {user.id}. Жилец -- {user.name} <MyButton onClick={() => removeClientInFlat(user.bindId, flat.id)}>x</MyButton>
        </div>
    )
}
