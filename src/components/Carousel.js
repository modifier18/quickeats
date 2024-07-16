import React from 'react'
import Pizza from '../images/Pizza.jpg'
export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:'10'}}>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success text-white" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src={Pizza} className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src={Pizza} className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src={Pizza} className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden text-white">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden text-white">Next</span>
                </button>
            </div>
        </div>
    )
}
