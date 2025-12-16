import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListCity {
  id: number;
  name: string;
}

export interface IDetailCity {
  id: number;
  name: string;
}

type TCityTotalCount = {
  data: IListCity[];
  totCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCityTotalCount | Error> => {
  try {
    const urlRelative = `/city?_page=${page}&_limit=${Environment.LIMIT_LINES}&name_like=${filter}`;

    const { data, headers } = await Api.get(urlRelative);

    if (data) {
      return {
        data,
        totCount: Number(headers["x-tot-count"] || Environment.LIMIT_LINES),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetailCity | Error> => {
  try {
    const { data } = await Api.get(`/city/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dataCity: Omit<IDetailCity, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailCity>("/city", dataCity);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dataCity: IDetailCity
): Promise<void | Error> => {
  try {
    await Api.put(`/city/${id}`, dataCity);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/city/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar o registro."
    );
  }
};

export const CitiesService = {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
};
