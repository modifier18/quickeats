import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Pizza from '../images/Pizza.jpg'
import Biryani from '../images/biryani.jpg'
import Paneer from '../images/paneertikka.jpg'
import { ToastContainer } from "react-toastify";
export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    setLoadError('');
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
    try {
      let response = await fetch(`${apiUrl}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length < 2) {
        throw new Error(`Unexpected data from API: ${JSON.stringify(data)}`);
      }
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (err) {
      console.error('loadData error:', err);
      setLoadError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData()
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="p-3 bg-light">
        <small>API URL: {process.env.REACT_APP_API_URL || 'http://localhost:4000'}</small><br />
        <small>Categories loaded: {foodCat.length}</small><br />
        <small>Items loaded: {foodItems.length}</small><br />
        {loading && <div className="text-info">Loading data...</div>}
        {loadError && <div className="text-danger">Error: {loadError}</div>}
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className=" d-flex justify-content-center">  
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={Pizza}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Biryani}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Paneer}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden text-white">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden text-white">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat && foodCat.length > 0
          ? foodCat.map((data) => {
            return (
              <div className="row mb-3" key={data.id}>
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage:
                      "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                />
                {foodItems && foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems.id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            );
          })
          : <div>No Categories Available</div>}
      </div>

      <div>
        <Footer />
      </div>
      <ToastContainer/>
    </div>
  );
}
