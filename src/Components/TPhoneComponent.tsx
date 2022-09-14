import React from "react";

import { styled, Box } from "@mui/material";
import PhoneInput from "react-phone-number-input";

const Input = (props: any) => {
    const BoxInline = styled(Box)(({ theme }) => ({
        flexDirection: "row",
        display: "flex"
    }));
    const BoxText = styled("div")(({ theme }) => ({
        display: 'flex',
        // alignItems: 'center !important',
        marginTop: '8px',
        "& span": {
            color: "red",
            paddingLeft: 5
        }
    }));

    return (
        <BoxInline pr={1} pl={1} >
            <BoxText>
                {props.label || props.labels} : {props.req && <span>*</span>}
            </BoxText>
            <Box>
                <PhoneInput
                    specialLabel={''}
                    country={'th'}
                    inputStyle={{
                        borderColor: (props.touched && props.error) && "red"
                    }}
                    {...props}
                />
                {(props.touched && props.error) && <p style={{ color: 'red' }} className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">{props.error}</p>}
            </Box>
        </BoxInline>
    );
};
export default function PhoneNumberInput(props: any): React.ReactElement {
    return (
        <Input
            label={"Mobile Phone"}
            req={true}
            helperText={""}
            error={true}
            isSelect={false}
            {...props.input}
            {...props.meta}
            {...props.custom}
        />
    );
}
