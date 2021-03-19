import styled, { keyframes } from "styled-components";
import { shade } from 'polished'


import signUpBackGroundImage from "../../assets/sigup-background.png"

interface IsProviderContainerProps {
    checked: boolean
}


const apearFromRight = keyframes` // This is for CSS animation

from {
    opacity:0;
    transform: translateX(50px)
}
to{
    opacity:1;
    transform: translateX(0);
}

`


export const Container = styled.div`

    height: 100vh;


    display:flex;
    align-items:stretch;
    justify-content:space-between;


`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    place-content:center; // This is amazing, does the same as justify and align itens center
    justify-content:center;
    animation: ${apearFromRight} 1s;
    width:100%;
    max-width:1000px;
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
        color: #F4EFE8;;
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
    background: url(${signUpBackGroundImage}) no-repeat center;
    background-size:cover;
    max-width:1500px;
    

`

export const IsProviderContainer = styled.div<IsProviderContainerProps>`

    display:flex;
    align-items: center;
    justify-content:center;
    width:100%;

svg {

    color: ${props => props.checked ?'#785F35' : '#FFF' }
    


}

p{

    margin-left:16px;

    color: ${props => props.checked ?'#785F35' : '#FFF' }
}

`;



