const url = 'http://localhost:3000/';

const funcions = {
    async fetchRooms() {
        
        const response = await fetch(url + 'rooms');
        const data = await response.json();
        return data;
    }
};
export default funcions;