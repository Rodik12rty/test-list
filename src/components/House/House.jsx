import { useState } from "react";
import ItemService from "../../API/APIService";
import { Flat } from "../Flat/Flat";


export const House = ({house, setActiveFlat, users, setUsers, setClientFormFlatId, getItemUsers}) => {

    const [flats, setFlats] = useState({});
    const [showFlats, setShowFlats] = useState(false);


    const getItemFlats = async (houseId) => {

        setShowFlats(!showFlats);

        const response = await ItemService.getHouseFlats(houseId);
        setFlats((oldFlats) => ({
            ...oldFlats,
            [houseId]: response.data
        }));
    };

    
    return (
        <div onClick={(e) => {getItemFlats(house.id); e.stopPropagation()}}>
            {house.id}. Дом -- {house.name}

            {showFlats && flats && Array.isArray(flats[String(house.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {flats[house.id].map(flat =>
                        <Flat key={flat.id} flat={flat} setUsers={setUsers} setFlats={setFlats} setActiveFlat={setActiveFlat} users={users} setClientFormFlatId={setClientFormFlatId} getItemUsers={getItemUsers} />
                    )}
                </div>
            }
        </div>    
    )
}
