export const fetchData = async <T>(url: string, method?: 'GET' | 'POST', body?: {}, signal?: AbortSignal) => {
    let data: T = <T>{};
    let error: string = '';

    url = import.meta.env.VITE_MESSENGER_API_URL + url;

    const reqParams: RequestInit = {
        method: method ? method : 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    };

    if(body && method !== 'GET') reqParams.body = JSON.stringify(body);
    if(signal) reqParams.signal = signal;

    try {
        const response = await fetch(url, reqParams);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        data = Object.assign(json);

    } catch (err) {
        error = `${err}`;
    }

    return { data, error }
};