import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { toast } from "react-toastify";

export default function Card({ foodItem, options }) {
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const cartData = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size]);

  const handleAddtoCart = async () => {
    let food = cartData.find((item) => item.id === foodItem._id);
    if (food) {
      if (food.size === size) {
        dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty });
      } else {
        dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty,
          size,
          img: foodItem.img,
        });
      }
    } else {
      dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: foodItem.img,
      });
    }
    toast.success(`${foodItem.name} added to cart!`);
  };

  return (
    <div className="card h-100 shadow-sm hover-card position-relative">
      {foodItem.isNew && (
        <span className="badge bg-warning text-dark position-absolute m-2">
          New
        </span>
      )}
      <img
        src={foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{foodItem.name}</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <select
            className="form-select w-50"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="form-select w-50"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {Object.keys(options).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="fs-5 mb-2">₹{finalPrice}/-</div>
        <button className="btn btn-success mt-auto" onClick={handleAddtoCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
