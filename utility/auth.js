import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import styled from 'styled-components';

const LoadingScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingDiv = styled.div`
  font-size: 50px;
`;

export const checkAdminClaim = async (user) => {
  const token = await user.getIdTokenResult();
  return Object.prototype.hasOwnProperty.call(token.claims, 'admin');
};

const AuthContext = createContext({});

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (currUser) => {
      if (currUser === null) {
        await router.replace('/');
      } else {
        const isAdmin = await checkAdminClaim(currUser);
        if (!isAdmin) {
          await router.replace('/');
        } else {
          setUser(currUser);
          if (router.pathname === '/') await router.push('/landing');
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, checkAdminClaim }}
    >
      {isLoading ? (
        <LoadingScreenContainer>
          <LoadingDiv>Authenticating...</LoadingDiv>
        </LoadingScreenContainer>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default Auth;
