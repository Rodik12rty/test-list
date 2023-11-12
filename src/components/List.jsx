import { useEffect, useState } from "react";
import s from './List.module.css';
import { useFetching } from "../hooks/useFetching";
import ItemService from "../API/APIService";
import { Street } from "./Street/Street";
import { useInput } from "../hooks/useInput";
import { MyInput } from "./UI/input/MyInput";
import { MyButton } from "./UI/button/MyButton";


export const Lists = () => {

    const name = useInput('', {minLength: 4, isEmpty: true, maxLength: 10});
    const phone = useInput('', {minLength: 4, isEmpty: true, maxLength: 12});
    const email = useInput('', {minLength: 4, isEmpty: true, isEmail: true});

    const [streets, setStreets] = useState([]);
    const [users, setUsers] = useState({});
    const [activeFlat, setActiveFlat] = useState(null);

    const [clientFormFlatId, setClientFormFlatId] = useState(null);

    // const [showClients, setShowClients] = useState(false);

    const[fetchStreets, isStreetsLoading, streetError] = useFetching(async () => {
        const response = await ItemService.getStreets();
        setStreets(response.data);
    });

    useEffect(() => {
        fetchStreets();
    }, []);

    const getFlatUsers = (flatId) => {
        if (Array.isArray(users[String(flatId)])) {
            return users[String(flatId)];
        }
        return [];
    };

    const getItemUsers = async (flatId) => {
        // setShowClients(!showClients)
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

    const removeClientInFlat = async (clientId, flatId) => {
        try {
            const userRemoveResponse = await ItemService.removeUser(clientId);
        } catch (error) {
            console.log("Something went wrong", error)
        }
        getItemUsers(flatId);
    }


    return (
        <div className={s.mainContainer}>
            <div className={s.navbar}>
                {streets.map(street =>
                    <Street 
                        key={street.id} 
                        street={street} 
                        setUsers={setUsers} 
                        setStreets={setStreets} 
                        setActiveFlat={setActiveFlat} 
                        users={users} 
                        setClientFormFlatId={setClientFormFlatId}
                        getItemUsers={getItemUsers}
                        // showClients={showClients}
                    />        
                )}
            </div>
            <div className={s.content}>
                {activeFlat?.id
                    ?
                    <div>
                        <div className={s.containerCardUser}>
                            {getFlatUsers(activeFlat.id).map(user =>
                                <div key={user.id} className={s.itemCardUser}>
                                    <div className={s.cntButton}>
                                        <MyButton onClick={() => removeClientInFlat(user.bindId, activeFlat.id)}>delete</MyButton>
                                    </div>
                                    <div onClick={() => console.log(user)}>
                                        {user.name}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {clientFormFlatId === activeFlat.id &&
                                <form>
                                    <h2>Добавте жильца</h2>
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
                                        onClick={e => {createClientInFlat(e, activeFlat.id)}}>
                                        addClient
                                    </MyButton>
                                </form>
                            }
                        </div>
                    </div>
                    :
                    <div style={{padding: '10px'}}>
                        Выберите квартиру слева в navbar
                    </div>
                }
            </div>
        </div>
    )
}
