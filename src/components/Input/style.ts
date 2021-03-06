import styled, { css } from "styled-components";
import Tooltip from "../../Tolltip";


interface ContainerProps {

    isFocused: boolean;
    isFilled: boolean;
    isError: boolean;
}


export const Container = styled.div<ContainerProps>`

            background: #232129;
            border-radius: 10px;
            width:100%;
            border:2px solid #232129;  // We use this for the border masage error
            padding:16px;
            color:#f4ede8;
            display:flex;
            align-items:center;

            & + div {
                margin:8px 0;
            }

    


            ${props => props.isError && css`

border-color:#c53030;

`}

            ${props => props.isFocused && css`
            color:#785F35;
            border-color: #785F35;
            
            `}

            ${props => props.isFilled && css`
            color:#785F35;
            
            
            `}
           

       

        input   {
            color:#f4ede8;
            flex:1;
            background:transparent;
            border:0;
            &::placeholder{
                color:#f4ede8
            }


        

        }

        svg{
            margin-right:16px;
        }

`


export const Error = styled(Tooltip)`
height:20px;
margin-left:6px;
    svg{
        margin:0
    }


    span{
        background:#c53030;
        color:#fff;
        &::before{
            border-color:#c53030 transparent;


        }
    }
`