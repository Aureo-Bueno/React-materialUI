import { AxiosError } from "axios";


export const errorInterceptor = (error: AxiosError) => {
  
    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexao.'));
    }

    if(error.response?.status === 401){
      //Autenticação do Backend
      //DO something
    }

    return Promise.reject(error);
};