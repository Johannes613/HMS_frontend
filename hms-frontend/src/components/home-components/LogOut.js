import React, { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
  const { setUser, setIsLoggedIn, setUserRole } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    setUser('');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');  // <-- Use navigate function here
  }, [setUser, setIsLoggedIn, setUserRole, navigate]);

  return (
    <div>
      You have been logged out.
    </div>
  );
}
