import { SetStateAction, useState } from 'react';

export default function useToken() {
    const [token, setToken] = useState(getToken());

    function getToken(){
        const tokenString = localStorage.getItem('token');
        return tokenString
      }
    
    const saveToken = (token:string) => {
        localStorage.setItem('token', token);
        setToken(token);
      };
    
    return{
        setToken: saveToken, token
    }
}