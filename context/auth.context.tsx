import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import firebase from 'firebase/app';

export type AuthContextType = {
  currentUser: firebase.User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (
    fullname: string,
    email: string,
    password: string,
    imageUrl?: string
  ) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  errorMessage: string;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null as firebase.User | null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function register(
    fullname: string,
    email: string,
    password: string,
    imageUrl?: string
  ) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      user?.updateProfile({
        displayName: fullname,
        photoURL:
          imageUrl ||
          'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
      });
      // user?.sendEmailVerification();
      setErrorMessage('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        setErrorMessage('The password is too weak.');
      } else if (errorCode == 'auth/email-already-in-use') {
        setErrorMessage('Email is already in use.');
      } else {
        setErrorMessage(errorMessage);
      }
      console.log(error);
    }
  }

  async function login(email: string, password: string) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setErrorMessage('');
    } catch (error) {
      const { code, message } = error;

      if (code === 'auth/wrong-password') {
        setErrorMessage('Invalid Credentials');
      } else {
        setErrorMessage(message);
      }
      console.log(error);
    }
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    return currentUser?.updateEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser?.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    isAuthenticated: !!currentUser?.email,
    login,
    register,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    errorMessage,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
