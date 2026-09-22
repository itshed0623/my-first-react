import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Content from './components/Content.jsx';
import Login from './Login';
import Display from './Display.jsx';
import Student from './Student.jsx';
import Admin from './Admin.jsx';
import Backend from './Backend.jsx'
import { Routes, Route, Navigate } from 'react-router-dom';

import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc,
  setDoc 
} from 'firebase/firestore';
import { divide } from 'firebase/firestore/pipelines';

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Stores 'admin', 'editor', 'student', etc.
  const [loading, setLoading] = useState(true);

  // 1. Authentication, User Synchronization, & Role Retrieval
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); //declared user

        // Reference to user's profile document in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Fetch existing role
          setRole(userSnap.data().role || 'student');
        } else {
          // New user: Save profile to Firestore with a default role
          const defaultRole = 'student'; 
          await setDoc(userRef, {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: defaultRole,
            createdAt: serverTimestamp()
          });
          setRole(defaultRole);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google Login Handler
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRole(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

``
  if (loading) return <h2>Loading Application State...</h2>;



  return (
      <Routes>
        <Route path='/login' element={!user ? <Login onLogin={handleLogin}/> : <Navigate to='/' replace/>}></Route>
        
        <Route path='/' element={
          user ?
            <div>
              <Header onLogout={handleLogout} />
              {role === 'student' && (
                
                // <h1>Student</h1>
                <Navigate to='/student' replace />
              )}

              {role === 'admin' && (
                <Navigate to='/admin' replace />
              )}
            </div>
          :
            <Navigate to='/login' replace />}></Route>
        
        <Route path='/student' element={
          <>
            {role === 'student' ? 
              <div>
                <Header onLogout={handleLogout} />
                <Student />
              </div>

              :

              <Navigate to='/login' replace/>
            }
            
          </>
        
        }></Route>

        <Route path='/admin' element={
          <>
            {role === 'admin' ? 
              <div>
                <Header onLogout={handleLogout} />
                <Display />
              </div>

              :

              <Navigate to='/login' replace/>
            }
            
          </>
        
        }></Route>
      </Routes>
  );
}