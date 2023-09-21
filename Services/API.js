const API = {
    url: "/data/menu.json",
    fetchmenu: async () => {
        const result = await fetch(API.url);
        return await result.json();
    }
}

export default API;