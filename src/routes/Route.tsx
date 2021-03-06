import React from 'react'

import { Redirect, Route as RouteDOM, RouteProps as ReactRoutePropsDOM } from 'react-router-dom'
import { useAuth } from '../hooks/auth'


interface RouteProps extends ReactRoutePropsDOM {
    isPrivate?: boolean;
    component: React.ComponentType;
}



const Route: React.FC<RouteProps> = ({ isPrivate=false, component: Component, ...rest }) => {

    const { user } = useAuth()

    return (<RouteDOM

        {...rest}
        render={() => {
            return isPrivate === !!user ? (
                <Component />
            ) : (
                    <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
                )
        }}


    >

    </RouteDOM>)
}


export default Route