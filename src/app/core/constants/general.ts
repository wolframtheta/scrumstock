import { ItemDTO } from "../dtos/items";
export const KEY_CART = 'cart';
// export const DEFAULT_ITEMS: ItemDTO[] = [
//   {
//     cost: 10,
//     id: 1,
//     img: 'https://www.tradeinn.com/f/13810/138100737/kruskis-camiseta-manga-corta-home.jpg',
//     name: 'Dessuadora',
//     price: 15,
//     quantity: 10,
//     sizes: [
//       {
//         id: 4,
//         name: 'XS',
//         quantity: 2,
//         idFather: 1,
//       },
//       {
//         id: 5,
//         name: 'S',
//         quantity: 2,
//         idFather: 1,
//       },
//       {
//         id: 6,
//         name: 'M',
//         quantity: 2,
//         idFather: 1,
//       },
//       {
//         id: 7,
//         name: 'L',
//         quantity: 2,
//         idFather: 1,
//       },
//       {
//         id: 8,
//         name: 'XL',
//         quantity: 2,
//         idFather: 1,
//       }
//     ]
//   },
//   {
//     cost: 10,
//     id: 2,
//     img: 'https://www.tradeinn.com/f/13810/138100737/kruskis-camiseta-manga-corta-home.jpg',
//     name: 'Pin',
//     price: 5,
//     quantity: 10
//   },
//   {
//     cost: 10,
//     id: 3,
//     img: 'https://www.tradeinn.com/f/13810/138100737/kruskis-camiseta-manga-corta-home.jpg',
//     name: 'Clauer',
//     price: 3,
//     quantity: 12
//   }
// ]

export const YES_NO_ALERT_BUTTONS = [
  {
    text: 'Cancelar',
    role: 'cancel',
  },
  {
    text: 'OK',
    role: 'ok',
  },
]


export enum TYPES_PRODUCT {
  SIZES = 'sizes',
  NORMAL = 'normal'
}

export enum TYPES_LOG {
  SALE = 'sale',
  MODIFICATION = 'modification',
  ADMIN = 'admin'
}

export enum ROLES {
  ADMIN = 'authenticated',
  MERXAN = 'merxan'
}
