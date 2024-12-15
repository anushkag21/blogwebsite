import React, { useEffect } from 'react';
import Body from './Body'
function Dashboard({user ,setUser}){
    return(
        <>
        <Body user ={user} setUser ={setUser} />
        </>
    );
};

export default Dashboard;