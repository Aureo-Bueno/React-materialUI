import { IListCity } from "../../../../shared/services/api/cities/CitiesService";

export interface ICityTableRowProps {
  city: IListCity;
  onDelete: (id: number) => Promise<void>;
  isDeleting: boolean;
}
