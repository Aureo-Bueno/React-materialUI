import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListPerson {
    id: number;
    email: string;
    cityId: number;
    nameComplete: string;
}

interface IDetailPerson {
    id: number;
    email: string;
    cityId: number;
    nameComplete: string;
}

type TPersonTotalCount = {
    data: IListPerson[];
    totCount: number;
}

const getAll = async (page = 1, filter = ''):Promise<TPersonTotalCount | Error> => {
  try {
      const urlRelative = `/person?_page=${page}&_limit=${Environment.LIMIT_LINES}&nameComplete_like=${filter}`;

      const { data, headers } = await Api.get(urlRelative); 

      if(data){
        return {
            data,
            totCount: Number(headers['x-tot-count'] || Environment.LIMIT_LINES),
        };
      }

      return new Error('Erro ao listar os registros.');
  } catch (error) {
      console.log(error);
      return new Error(( error as {message:string}).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number):Promise<IDetailPerson | Error> => {
    try {
  
        const { data } = await Api.get(`/person/${id}`); 
  
        if(data){
           return data;
        }
  
        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.log(error);
        return new Error(( error as {message:string}).message || 'Erro ao consultar o registro.');
    }
}

const create = async (dataPerson: Omit<IDetailPerson, 'id'>):Promise<number | Error> => {
    try {
  
        const { data } = await Api.post<IDetailPerson>('/person', dataPerson); 
  
        if(data){
           return data.id;
        }
  
        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.log(error);
        return new Error(( error as {message:string}).message || 'Erro ao criar o registro.');
    }
}

const updateById = async (id: number, dataPerson: IDetailPerson):Promise<void | Error> => {
    try {
  
         await Api.put(`/person/${id}`, dataPerson); 
  
    } catch (error) {
        console.log(error);
        return new Error(( error as {message:string}).message || 'Erro ao atualizar o registro.');
    }
}

const deleteById = async (id: number):Promise<void | Error> => {
    try {
  
        await Api.delete(`/person/${id}`); 
 
   } catch (error) {
       console.log(error);
       return new Error(( error as {message:string}).message || 'Erro ao deletar o registro.');
   }

}

export const PersonService = {
    getAll,
    create,
    deleteById,
    updateById,
    getById

}