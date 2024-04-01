import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {AuthStat} from '../Hooks/AuthStat';
import Spinner from './Spinner';
export default function PrivateRoute() {
const {loggedIn, checking} = AuthStat();
if(checking) {
    return <Spinner/>
}
return loggedIn ? <Outlet /> : <Navigate to="/login"/>
}