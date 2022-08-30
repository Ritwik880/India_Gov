import React from 'react'
import styled from 'styled-components'
const Header = () => {
    const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.bg};
    `
    const Ul = styled.ul`
        gap: 3rem;
    `
    const Header = styled.header`
        
    `
    return (
        <Header>
            <Div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga qui unde numquam doloribus eligendi cum maiores illo iure voluptatibus vel distinctio, quidem voluptas consequuntur. Eaque dolorem fugiat facere minus vel!
            </Div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">HOME</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">ABOUT US</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">CAREER</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">GALLERY</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">CONTACT US</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">LOGIN</a>
                            </li>

                        </Ul>

                    </div>
                </div>
            </nav>
        </Header>
    )
}

export default Header