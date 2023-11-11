import { useEffect, useState } from "react";
import s from './List.module.css';
import { useFetching } from "../hooks/useFetching";
import ItemService from "../API/APIService";
import { Street } from "./Street/Street";


export const Lists = () => {

    const [streets, setStreets] = useState([]);
    const [users, setUsers] = useState({});
    const [activeFlat, setActiveFlat] = useState(null);

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


    return (
        <div className={s.mainContainer}>
            <div className={s.navbar}>
                {streets.map(street =>
                    <Street key={street.id} street={street} setUsers={setUsers} setStreets={setStreets} setActiveFlat={setActiveFlat} users={users} />        
                )}
            </div>
            <div className={s.content}>
                {activeFlat?.id
                    ?
                    <div className={s.containerCardUser}>
                        {getFlatUsers(activeFlat.id).map(user =>
                            <div className={s.itemCardUser} key={user.id} onClick={() => console.log(user)}>
                                {user.name}
                            </div> 
                        )}
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
