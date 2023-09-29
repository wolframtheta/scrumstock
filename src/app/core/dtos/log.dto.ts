import { StoreDTO } from "./stores";

export interface LogDTO {
  client: string;
  description: string;
  total: number;
  store: StoreDTO;
  type: string;
  user?: any;
  id?: number;
  data?: any;
}
