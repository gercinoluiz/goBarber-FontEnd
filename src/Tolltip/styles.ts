import styled from "styled-components";


export const Container = styled.div`

    position:relative;

    span{
        width:160px;
        background:#c53030;
        color: #312e38;
        font-weight:500;
        visibility: hidden;
        padding:8px;
        font-size:14px;
        border-radius:4px;
        opacity:0;
        transition:opacity 0.4s;


        position:absolute;

        bottom:calc(100% + 12px);
        left:50%;
        transform: translate(-50%);


       

        &::before{
            content:'';
            border-style:solid;
            border-color:#785F35 transparent;
            border-width: 6px 6px 0 6px;
            top: 100%;
            position:absolute;
            left:50%;
            transform: translate(-50%);

        }

     
    }

    &:hover span{
        opacity:1;
        visibility:visible;

        }

` 