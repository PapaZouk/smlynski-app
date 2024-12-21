type Config = {
    url: string;
    token: string;
}

export function getConfig(): Config {
    const API_URL = Deno.env.get('API_URL') || '';
    const API_TOKEN = Deno.env.get('API_TOKEN') || '';

   return {
         url: API_URL,
         token: API_TOKEN
   }
}
