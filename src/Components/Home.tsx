import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import ButtonMap from './elements/ButtonMap';
import Notification from './elements/Notification';

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };


    return (
        <>

            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                <Carousel.Item >
                    <img
                        className="d-block w-100 landingBanner"
                        src="https://source.unsplash.com/720x600/?politics"
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 landingBanner"
                        src="https://source.unsplash.com/720x600/?law"
                        alt="Second slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 landingBanner"
                        src="https://source.unsplash.com/720x600/?government"
                        alt="Third slide"
                    />

                </Carousel.Item>
            </Carousel>
            <ButtonMap />
            <Notification />


        </>
    )
}

export default Home