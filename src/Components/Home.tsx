import React from 'react';
import ButtonMap from './elements/ButtonMap';
import Notification from './elements/Notification';

const Home = () => {

    return (
        <>
            <div className="pb-6 d-flex align-items-center home-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <ButtonMap />
            <Notification />


        </>
    )
}

export default Home