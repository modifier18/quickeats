import React, { useRef, useState, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
    const priceRef = useRef()
    let dispatch = useDispatchCart()
    let options = props.options
    let priceOptions = Object.keys(options)
    let foodItem = props.foodItems;
    let data = useCart()
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")
    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== 0 ) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.foodItem.img})
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size]);
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "190px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'> ₹{finalPrice}/-</div>
                            <hr></hr>
                            <button className={'justify-centre ms-2 btn btn-success'} onClick={handleAddtoCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
