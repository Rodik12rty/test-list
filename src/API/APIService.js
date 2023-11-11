import axios from 'axios';


export default class ItemService {
    static async getStreets() {
        const response = await axios.get('https://dispex.org/api/vtest/Request/streets');
        return response;
    }

    static async getHouses(streetId) {
        const response = await axios.get(`https://dispex.org/api/vtest/Request/houses/${streetId}`);
        return response;
    }

    static async getHouseFlats(houseId) {
        const response = await axios.get(`https://dispex.org/api/vtest/Request/house_flats/${houseId}`);
        return response;
    }

    static async getFlatUsers(flatId) {
        const response = await axios.get(`https://dispex.org/api/vtest/HousingStock/clients?addressId=${flatId}`);
        return response;
    }

    static async addUser(userData) {
        const response = await axios.post(`https://dispex.org/api/vtest/HousingStock/client`, {
            "Name": userData.name,
            "Phone": userData.phone,
            "Email": userData.email,
        });
        return response;
    }

    static async bindUser(payload) {
        const response = await axios.put(`https://dispex.org/api/vtest/HousingStock/bind_client`, {
            "AddressId": payload.addressId,
            "ClientId": payload.clientId
        });
        return response;
    }
    
    static async removeUser(clientId) {
        const response = await axios.delete(`https://dispex.org/api/vtest/HousingStock/bind_client/${clientId}`);
        return response;
    }
}
