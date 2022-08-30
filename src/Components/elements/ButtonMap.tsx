import React from 'react'

//styled components
import styled from 'styled-components';

//constants
import { BUTTONDATA as data } from '../../utils/constants';

const ButtonMap = () => {
    const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.5rem;
    background: ${({ theme }) => theme.colors.background};
    
    `
    const Button = styled.button`
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        background: ${({ theme }) => theme.colors.btn};
        color: ${({ theme }) => theme.colors.grey};
    `
    return (

        <Div>
            {
                data.map((item, i) => {
                    return (
                        <Button key={i}>
                            {item.title}
                        </Button>
                    )
                })
            }

        </Div>

    )
}

export default ButtonMap