import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

type Data = {
  id: number
  title: string
  price: number
  quantity: number
  image: string
  swatchColor: string
  swatchTitle: string
  estimatedDeliveryDate?: string
}
const DELIVERY_DATES = [
  {
    postal: "V",
    ids: [2],
    estimatedDeliveryDate: "Nov 24, 2021"
  },
  {
    postal: "V",
    ids: [1,3],
    estimatedDeliveryDate: "Nov 19, 2021"
  },
  {
    postal: "M",
    ids: [2,3],
    estimatedDeliveryDate: "Nov 22, 2021"
  },
  {
    postal: "M",
    ids: [1],
    estimatedDeliveryDate: "Dec 19, 2021"
  },
  {
    postal: "K",
    ids: [1,2,3],
    estimatedDeliveryDate: "Dec 24, 2021"
  },
]

const data: Data[] = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
    `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75`,
    swatchColor: "#959392",
    swatchTitle: "Grey"
  },
  {
    id: 2,  
    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:  
    `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75`,
    swatchColor: "#191944",
    swatchTitle: "Blue"  
  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,  
    image:
    `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75`,
    swatchColor: "#F8F1EC",
    swatchTitle: "White"
  },
]

export const GET = (
  req: NextApiRequest,
  res: NextResponse,
) => {
  
  const p = req?.url?.slice(req.url.lastIndexOf('?') + 1)?.substring(0, 1);
  const filteredItems: Data[] = DELIVERY_DATES.reduce((items: Data[], dd) => {
    if(dd.postal === p?.toString().toUpperCase()) {
      dd.ids.map((id: number) => {
        const foundItem = data.find((dt: Data) => dt.id === id);

        if (foundItem) items.push({...foundItem,
          estimatedDeliveryDate: dd.estimatedDeliveryDate});
      });
    }
    return items;
  }, []) ?? [];
  return NextResponse.json(filteredItems);
}