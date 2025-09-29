// POST
export const addEvent = async (data: any): Promise<any> => {
    const res = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

// GET
export const getEvents = async () => {
    const res = await fetch('http://localhost:8000/api/events');
    if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
    const data = await res.json();
    return data;
};
