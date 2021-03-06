import styled from "styled-components";
import {shade} from "polished"


export const Container = styled.button`
            background:#785F35;
            width:100%;
            height:56px;
            padding:0 16px;
            border-radius:10px;
            border:0;
            color:#312338;
            font-weight:500;
            margin:16px 0;
            transition: background-color 0.2s;

            &:hover{
                background-color: ${shade(0.2, '#785F35')}
            }


`