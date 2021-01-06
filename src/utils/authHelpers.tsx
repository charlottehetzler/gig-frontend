import React, { createContext } from 'react';
import { any } from 'prop-types';

interface AppContextInterface {
    signIn: any,
    signUp: any,
    signOut: any
  }

export const AuthContext = createContext(any);