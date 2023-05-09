'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './page.module.css';
type Data = {
  id: number
  title: string
  price: number
  quantity: number
  image: string
  swatchColor: string
  swatchTitle: string
  estimatedDeliveryDate ?: string
}
const lineItemData = [
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
];

//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";
const ESTIMATED_DELIVERY = "Nov 24, 2021";

const Home = () => {
  // const [addItemIndex, setAddItemIndex] = useState(0);
  const [fees, setFees] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 15,
    total: 0
  });
  const [lineItems, setLineItems] = useState<Data[]>([]);
  const [postal, setPostal] = useState('');

  const fetchData = async () => {
    const data  = await (await fetch('/api/data?'+postal)).json();
    setLineItems(data);
  }
  const removeLineItem = (lineItemId: number) => {
    const itemIndex = lineItems.findIndex(li => li.id === lineItemId);
    setLineItems([...lineItems.filter((item, idx) => idx !== itemIndex)]);
  }

  const addLineItem = (addItemIndex = 0) => {
    setLineItems([...lineItems, { ...lineItemData[addItemIndex]}]);
    // const newIndex = addItemIndex + 1;
    // setAddItemIndex(newIndex > 2 ? 0 : newIndex);
  }

  const calculateFees = () => {
    if(!lineItems) return;
    const subtotal = lineItems.reduce((acc, item) => {
      return acc + item.price
    }, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax + fees.shipping;
    setFees({
      ...fees,
      subtotal,
      tax,
      total
    });
  }

  useEffect(() => {
    if (!lineItems) return;
    calculateFees();
    document.querySelector('[class^=page_cartItems]>div:last-of-type')?.scrollIntoView();
  }, [lineItems])

  useEffect(() => {
    fetchData();
  }, [postal])
  return (
    <div className={styles.main}>
      <h2 className={styles.header} style={{color: BLUE}}>Your Cart</h2>
      <div className={styles.cartItems}>
        {
          lineItems.length > 0 ? lineItems.map((item, idx) => (
            <div className={styles.cartItem} key={idx}>
              <img className={styles.cartItemImg} src={item?.image} alt="" />
              <div className={styles.cartItemDescription}>
                <div className={styles.cartItemNamePrice}>
                  <b className={styles.name} style={{color: BLUE}}>{item?.title}</b>
                  <a className={styles.price}>${item?.price}</a>
                </div>
                <span className={styles.cartItemSwatch}>
                  <div className={styles.color} style={{backgroundColor: item?.swatchColor}}></div>
                  <div className={styles.title}>{item?.swatchTitle}</div>
                </span>
                {/* <div className={styles.cartQty}>
                  <b>Quantity: </b>
                  <div className="qty">{item?.quantity}</div>
                </div> */}
                <div className={styles.delivery}>
                  <b>Estimated Delivery Date: </b>
                  <span>{item?.estimatedDeliveryDate ?? ESTIMATED_DELIVERY}</span>
                </div>
                <div className={styles.action}>
                  <a onClick={() => removeLineItem(item.id)} style={{textDecoration: 'underline'}}>Remove</a>
                </div>
              </div>
            </div>
          ))
          :
          <p style={{textAlign:'center', padding: '1rem'}}>No items available for this postal code.</p>
        }
      </div>
      <div className="addLineItem" style={{display:'flex', justifyContent:'center', gap:'1rem'}}>
        <button onClick={()=>addLineItem(0)} style={{padding:'0.5rem', borderRadius:'8px'}}>Add Grey Sofa</button>
        <button onClick={()=>addLineItem(1)} style={{padding:'0.5rem', borderRadius:'8px'}}>Add Blue Sofa</button>
        <button onClick={()=>addLineItem(2)} style={{padding:'0.5rem', borderRadius:'8px'}}>Add White Sofa</button>
      </div>
      {
        lineItems && <div className={styles.cartFees}>
        <div className={styles.subItem}>
          <b className={styles.title}>Subtotal</b>
          <p className={styles.fee}>${fees.subtotal.toFixed(2)}</p>
        </div>
        <div className={styles.subItem}>
          <b className={styles.title}>Taxes (estimated)</b>
          <p className={styles.fee}>${fees.tax.toFixed(2)}</p>
        </div>
        <div className={styles.subItem}>
          <b className={styles.title}>Shipping</b>
          <p className={styles.fee}>{fees.shipping}</p>
        </div>
        <div className={styles.subItem}>
          <b className={styles.title}>Total</b>
          <p className={styles.fee} style={{color:BLUE}}>${fees.total.toFixed(2)}</p>
        </div>
      </div>
      }
      <div className="postal">
        <label style={{display:'inline', verticalAlign:'middle'}} htmlFor="postal">Postal: </label>
        <input style={{padding:'0.5rem', display:'inline-block', verticalAlign: 'middle'}} type='text' name='postal' id='postal' value={postal} onChange={(e)=>setPostal(e.target.value)}/>
      </div>
    </div>
  )
}

export default Home