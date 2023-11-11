import { useState } from "react";
import ItemService from "../../API/APIService";
import { useInput } from "../../hooks/useInput";
import { MyButton } from "../UI/button/MyButton";
import { MyInput } from "../UI/input/MyInput";
import { User } from "../User/User";


export const Flat = ({flat, setUsers, setActiveFlat, users}) => {

    const name = useInput('', {minLength: 4, isEmpty: true, maxLength: 10});
    const phone = useInput('', {minLength: 4, isEmpty: true, maxLength: 12});
    const email = useInput('', {minLength: 4, isEmpty: true, isEmail: true});

    const [clientFormFlatId, setClientFormFlatId] = useState(null);

    const getItemUsers = async (flatId) => {
        const response = await ItemService.getFlatUsers(flatId);
        setUsers((oldUsers) => ({
            ...oldUsers,
            [flatId]: response.data
        }));
    };

    
    const createClientInFlat = async (e, flatId) => {
        e.preventDefault();
       
        const userData = {
            name: name.value,
            phone: phone.value,
            email: email.value
        }

        const userResponse = await ItemService.addUser(userData);

        if (userResponse?.data?.result === 'Ok' && typeof(userResponse?.data?.id) === 'number') {
            const userBindResponse = await ItemService.bindUser({
                addressId: flatId,
                clientId: userResponse.data.id
            });

            getItemUsers(flatId);

            // setClientFormFlatId(null);

            name.setValue('');
            phone.setValue('');
            email.setValue('');
        }
    };

    
    return (
        <div key={flat.id} onClick={() => {getItemUsers(flat.id); setActiveFlat(flat)}} >
            {flat.id}. Квартира -- {flat.name}

            <MyButton onClick={() => {setActiveFlat(flat); setClientFormFlatId(flat.id)}}>addClient</MyButton>

            {clientFormFlatId === flat.id &&
                <form>
                    {(name.isDirty && name.minLengthError) && <div style={{color: 'red'}}>Введите больше символов для поля</div>}
                    {(name.isDirty && name.maxLengthError) && <div style={{color: 'red'}}>Слишком длинное имя жильца</div>}
                    {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    <MyInput
                        value={name.value}
                        onChange={e => {name.onChange(e)}}
                        onBlur={e => name.onBlur(e)}
                        type="text"
                        placeholder="name" 
                    /><br/>

                    {(phone.isDirty && phone.minLengthError) && <div style={{color: 'red'}}>Введите больше цифр для номера телефона</div>}
                    {(phone.isDirty && phone.maxLengthError) && <div style={{color: 'red'}}>Слишком длинный номер телефона</div>}
                    {(phone.isDirty && phone.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    <MyInput
                        value={phone.value}
                        onChange={e => {phone.onChange(e)}}
                        onBlur={e => phone.onBlur(e)}
                        type="text"
                        placeholder="phone"
                    /><br/>

                    {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Введите больше символов для поля</div>}
                    {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Некоректный email</div>}
                    <MyInput
                        value={email.value}
                        onChange={e => {email.onChange(e)}}
                        onBlur={e => email.onBlur(e)}
                        type="text"
                        placeholder="email"
                    /><br/>

                    <MyButton 
                        disabled={!name.inputValid || !phone.inputValid || !email.inputValid} 
                        onClick={e => createClientInFlat(e, flat.id)}>
                        addClient
                    </MyButton>
                </form>
            }

            {users && Array.isArray(users[String(flat.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {users[flat.id].map(user =>
                        <User user={user} getItemUsers={getItemUsers} flat={flat} />
                    )}
                </div>
            }
        </div>
    )
}
