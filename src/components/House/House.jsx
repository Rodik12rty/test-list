import { useState } from "react";
import ItemService from "../../API/APIService";
import { Flat } from "../Flat/Flat";


export const House = ({house, setActiveFlat, users, setUsers, setClientFormFlatId, getItemUsers}) => {

    const [flats, setFlats] = useState({});


    const getItemFlats = async (houseId) => {
        const response = await ItemService.getHouseFlats(houseId);
        setFlats((oldFlats) => ({
            ...oldFlats,
            [houseId]: response.data
        }));
    };

    
    return (
        <div onClick={() => getItemFlats(house.id)}>
            {house.id}. Дом -- {house.name}

            {flats && Array.isArray(flats[String(house.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {flats[house.id].map(flat =>
                        <Flat key={flat.id} flat={flat} setUsers={setUsers} setFlats={setFlats} setActiveFlat={setActiveFlat} users={users} setClientFormFlatId={setClientFormFlatId} getItemUsers={getItemUsers} />
                    )}
                </div>
            }
        </div>    
    )
}
