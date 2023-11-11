import { useState } from "react";
import ItemService from "../../API/APIService";
import { House } from "../House/House";


export const Street = ({street, setUsers, setActiveFlat, users}) => {

    const [houses, setHouses] = useState({});
    

    const getItemHouses = async (streetId) => {
        const response = await ItemService.getHouses(streetId);
        setHouses((oldHouses) => ({
            ...oldHouses,
            [streetId]: response.data
        }));
    };

    
    return (
        <div key={street.id} onClick={() => getItemHouses(street.id)}>
            {street.id}. Улица -- {street.name}

            {houses && Array.isArray(houses[String(street.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {houses[street.id].map(house =>
                        <House house={house} setUsers={setUsers} setActiveFlat={setActiveFlat} users={users} />
                    )}
                </div>
            }

        </div>
    )
}
