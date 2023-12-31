import { useState } from "react";
import ItemService from "../../API/APIService";
import { House } from "../House/House";


export const Street = ({street, setUsers, setActiveFlat, users, setClientFormFlatId, getItemUsers}) => {

    const [houses, setHouses] = useState({});
    const [showHouses, setShowHouses] = useState(false);
    
    const getItemHouses = async (streetId) => {

        setShowHouses(!showHouses);

        const response = await ItemService.getHouses(streetId);
        setHouses((oldHouses) => ({
            ...oldHouses,
            [streetId]: response.data
        }));
    };

    
    return (
        <div onClick={() => getItemHouses(street.id)} style={{cursor: 'pointer'}} >
            {street.id}. Улица -- {street.name}

            {showHouses && houses && Array.isArray(houses[String(street.id)]) &&
                <div style={{marginLeft: '10px'}}>
                    {houses[street.id].map(house =>
                        <House key={house.id} house={house} setUsers={setUsers} setActiveFlat={setActiveFlat} users={users} setClientFormFlatId={setClientFormFlatId} getItemUsers={getItemUsers} />
                    )}
                </div>
            }

        </div>
    )
}
