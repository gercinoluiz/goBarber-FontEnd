import styled, { keyframes } from "styled-components";
import { shade } from 'polished'


import signinBackGroundImage from "../../assets/sigin-background.jpeg"



export const Container = styled.div`

    height: 100vh;


    display:flex;
    align-items:stretch;
    justify-content:space-between;



`

const appearFromLeft = keyframes`

    from{
        opacity:0;
        transform: translateX(-50px)
    }
    to{
        opacity:1,
        transform: translateX(0)
    }

`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    place-content:center; // This is amazing, does the same as justify and align itens center


    width:100%;
    max-width:700px;

    animation:${appearFromLeft} 1s;

    form{
        margin: 80px 0;
        width:360px;
        text-align:center;

            h1{
            margin-bottom:24px;
        }


        a {
                color: #F4EFE8;
                display:block;
                margin-top:24px;
                text-decoration:none;
                transition:color 0.2s;

                &:hover{
                    color: ${shade(0.2, '#F4EFE8')}
                }
            }
    }

    > a{  // O sinal de maior diz somente esse A
        color: #785F35;
                display:block;
                margin-top:24px;
                text-decoration:none;
                transition:color 0.2s;
                display:flex;
                align-items:center;


                &:hover{
                    color: ${shade(0.2, '#785F35')}
                }

                svg{
                   margin-right:16px; 
                }
    }






`

export const Background = styled.div`

    flex: 1; // oculpa todo espaco disponivel
    background: url(${signinBackGroundImage}) no-repeat center;
    background-size:cover;
    max-width:1000px;
    

`