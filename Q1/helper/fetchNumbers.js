import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const id_url = {
    p : 'http://20.244.56.144/evaluation-service/primes',
    f: 'http://20.244.56.144/evaluation-service/fibo',
    e: 'http://20.244.56.144/evaluation-service/even',
    r : 'http://20.244.56.144/evaluation-service/rand'
}

const ACCESS_TOKEN = process.env.TOKEN
export default async function fetchNums(id) {
    const url = id_url[id];
    if (!url) throw new Error('Invalid ID');
    try {
      const response = await axios.get(url, 
        { 
            //will automatically exits if the request is going to take more than 500ms
            timeout: 500,
            headers : {
                Authorization : `Bearer ${ACCESS_TOKEN}`
            }
        });
        return response.data;
    } 
        catch (err) {
        throw new Error('API request failed or timed out');
    }
  }