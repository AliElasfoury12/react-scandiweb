
export default class API 
{
  
    static async fetch (query, variables = {}) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query: query, variables: variables}),
        };
            // 'https://alielasfoury12-scandweb-backend.tiiny.io/'
            // 'http://127.0.0.1:7000/'

        try {
            let res = await fetch('https://alielasfoury12-scandweb-backend.tiiny.io/', options)
            res = await res.json()
            console.log(res);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

}
