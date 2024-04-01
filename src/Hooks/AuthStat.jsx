import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export function AuthStat() {
    const [loggedIn, setLoggedIn] = useState(false);    
    const [checking, setChecking] = useState(true);
    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                
            } 
                setChecking(false);
        });
    }, []);
    return { loggedIn, checking};
}