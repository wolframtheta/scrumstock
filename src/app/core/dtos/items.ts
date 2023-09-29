export interface ItemDTO {
  id: number;
  name: string;
  img: string;
  price: number;
  cost: number;
  quantity: number;
  sizes?: SizeItem[];
  typeProduct: string;
}

export interface SizeItem {
  id: number;
  idFather: number;
  name: string;
  quantity: number;
}

export interface CartDTO {
  items: SalesItemDTO[];
  total: number;

}

export interface SalesItemDTO {
  id: number;
  name: string;
  quantity: number;
  quantityAdded: number;
  size?: string;
  idFather?: number;
  isAdded: boolean;
  price: number;
  img?: string;
}
