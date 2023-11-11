import { useState } from "react";
import ItemService from "../../API/APIService";
import { Flat } from "../Flat/Flat";


export const House = ({house, setActiveFlat, users, setUsers}) => {

    const [flats, setFlats] = useState({});


    const getItemFlats = async (houseId) => {
        const response = await ItemService.getHouseFlats(houseId);
        setFlats((oldFlats) => ({
            ...oldFlats,
            [houseId]: response.data
        }));
    };

    
    return (
        <div key={house.id} onClick={() => getItemFlats(house.id)}>
            {house.id}. Дом -- {house.name}

            {flats && Array.isArray(flats[String(house.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {flats[house.id].map(flat =>
                        <Flat flat={flat} setUsers={setUsers} setFlats={setFlats} setActiveFlat={setActiveFlat} users={users} />
                    )}
                </div>
            }
        </div>    
    )
}
