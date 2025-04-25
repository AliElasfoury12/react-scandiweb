
export default class API 
{
  
    static async fetch (query, variables = {}) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query: query, variables: variables}),
        };
            // 'http://alielasfoury12scwe.atwebpages.com/'
            // 'http://127.0.0.1:7000/'

        try {
            let res = await fetch('https://alielasfoury12scwe.atwebpages.com/', options)
            res = await res.json()
            console.log(res);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

}
