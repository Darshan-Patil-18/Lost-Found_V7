import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL,
    deleteObject 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
    getFirestore, 
    setDoc, 
    doc, 
    getDoc,
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyCmyC9BaGtMQQOFOGap4yXJFW2fmffXzqY",
    authDomain: "losting-de2b6.firebaseapp.com",
    projectId: "losting-de2b6",
    storageBucket: "losting-de2b6.firebasestorage.app",
    messagingSenderId: "1040474458368",
    appId: "1:1040474458368:web:c89f926df239a27a3e0be5"
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(function() {
            messageDiv.style.opacity = 0;
        }, 5000);
    }
}

// Email Sign Up
const signUp = document.getElementById('submitSignUp');
if (signUp) {
    signUp.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const name = document.getElementById('fName').value;

        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: name,
                lastName: '',
                createdAt: new Date().toISOString(),
                providers: ['email']
            };
            showMessage('Account Created Successfully!', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
            .then(() => {
                // Store email in localStorage for enrollment verification
                localStorage.setItem('currentUserEmail', email);
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'main.html';
            })
            .catch((error) => {
                console.error("Error writing document", error);
                showMessage('Account created but profile setup failed. Please contact support.', 'signUpMessage');
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                // Check if this email exists with Google provider
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    if (signInMethods.includes('google.com')) {
                        showMessage('This email is already registered with Google. Please sign in with Google instead.', 'signUpMessage');
                    } else {
                        showMessage('Email Address Already Exists! Please sign in instead.', 'signUpMessage');
                    }
                })
                .catch(() => {
                    showMessage('Email Address Already Exists!', 'signUpMessage');
                });
            } else {
                showMessage('Unable to create user. Please try again.', 'signUpMessage');
            }
        });
    });
}

// Enhanced Email Sign In with better error handling
const signIn = document.getElementById('submitSignIn');
if (signIn) {
    signIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login successful!', 'signInMessage');
            const user = userCredential.user;
            
            // Store user info in localStorage
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('currentUserEmail', email);
            
            // Update user data in Firestore if needed
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid);
            getDoc(userDocRef)
            .then((docSnap) => {
                if (!docSnap.exists()) {
                    // Create user document if it doesn't exist
                    const userData = {
                        email: email,
                        firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
                        lastName: '',
                        lastLogin: new Date().toISOString(),
                        providers: ['email']
                    };
                    setDoc(userDocRef, userData);
                } else {
                    // Update existing document
                    const userData = {
                        ...docSnap.data(),
                        lastLogin: new Date().toISOString()
                    };
                    // Add email provider if not already included
                    if (!userData.providers || !userData.providers.includes('email')) {
                        userData.providers = userData.providers ? [...userData.providers, 'email'] : ['email'];
                    }
                    setDoc(userDocRef, userData, { merge: true });
                }
            });
            
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log('Sign in error:', errorCode, error.message);
            
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
                // Check if account exists with different provider
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    console.log('Sign in methods for', email, ':', signInMethods);
                    if (signInMethods.includes('google.com')) {
                        showMessage('This account was created using Google Sign-In. Please sign in with Google.', 'signInMessage');
                    } else {
                        showMessage('Incorrect Email or Password', 'signInMessage');
                    }
                })
                .catch((fetchError) => {
                    console.error('Error fetching sign-in methods:', fetchError);
                    showMessage('Incorrect Email or Password', 'signInMessage');
                });
            } else if (errorCode === 'auth/user-not-found') {
                // Check if this might be a Google account
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    if (signInMethods.length > 0) {
                        if (signInMethods.includes('google.com')) {
                            showMessage('This account was created using Google Sign-In. Please sign in with Google.', 'signInMessage');
                        } else {
                            showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                        }
                    } else {
                        showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                    }
                })
                .catch((fetchError) => {
                    showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                });
            } else {
                showMessage('Login failed. Please try again.', 'signInMessage');
            }
        });
    });
}

// Enhanced Google Sign In/Sign Up with account linking
function handleGoogleSignIn() {
    const auth = getAuth();
    const db = getFirestore();

    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        const userEmail = user.email;
        
        // Store user info in localStorage immediately
        localStorage.setItem('loggedInUserId', user.uid);
        localStorage.setItem('currentUserEmail', userEmail);
        
        // Check if user document exists
        const userDocRef = doc(db, "users", user.uid);
        
        getDoc(userDocRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                // User exists, update last login
                const userData = {
                    ...docSnap.data(),
                    lastLogin: new Date().toISOString(),
                    photoURL: user.photoURL,
                    displayName: user.displayName
                };
                // Add Google provider if not already included
                if (!userData.providers || !userData.providers.includes('google')) {
                    userData.providers = userData.providers ? [...userData.providers, 'google'] : ['google'];
                }
                return setDoc(userDocRef, userData, { merge: true });
            } else {
                // New user, create document
                const userData = {
                    email: userEmail,
                    firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
                    lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    providers: ['google'],
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                return setDoc(userDocRef, userData);
            }
        })
        .then(() => {
            showMessage('Google Sign In Successful!', 'signInMessage');
            
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch((error) => {
            console.error("Error handling user data:", error);
            showMessage('Sign in successful but profile setup failed.', 'signInMessage');
        });
    })
    .catch((error) => {
        console.error('Google Sign In Error:', error);
        const errorCode = error.code;
        const errorEmail = error.customData?.email;
        
        if (errorCode === 'auth/account-exists-with-different-credential') {
            // Account exists with different credential - handle linking
            handleAccountLinking(error, errorEmail);
        } else if (errorCode === 'auth/popup-closed-by-user') {
            // User closed the popup, no message needed
        } else {
            showMessage('Google Sign In failed. Please try again.', 'signInMessage');
        }
    });
}

// Handle account linking when email already exists with different provider
function handleAccountLinking(error, email) {
    const auth = getAuth();
    const db = getFirestore();
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    if (!credential) {
        showMessage('Unable to link accounts. Please try signing in with email/password first.', 'signInMessage');
        return;
    }

    // First, try to sign in with email/password to get the existing account
    showMessage('This email is already registered. Please enter your password to link accounts.', 'signInMessage');
    
    // Create a modal or prompt for password
    const password = prompt(`Please enter your password for ${email} to link with Google account:`);
    
    if (!password) {
        showMessage('Account linking cancelled.', 'signInMessage');
        return;
    }

    // Sign in with email/password first
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const existingUser = userCredential.user;
        
        // Now link the Google credential to the existing account
        return linkWithCredential(existingUser, credential)
        .then((linkResult) => {
            const user = linkResult.user;
            
            // Update user document with Google provider info
            const userDocRef = doc(db, "users", user.uid);
            return getDoc(userDocRef)
            .then((docSnap) => {
                const userData = {
                    ...docSnap.data(),
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    lastLogin: new Date().toISOString()
                };
                // Add Google provider
                if (!userData.providers || !userData.providers.includes('google')) {
                    userData.providers = userData.providers ? [...userData.providers, 'google'] : ['google'];
                }
                return setDoc(userDocRef, userData, { merge: true });
            })
            .then(() => {
                // Update localStorage with the linked account
                localStorage.setItem('loggedInUserId', user.uid);
                localStorage.setItem('currentUserEmail', email);
                
                showMessage('✅ Success! Your Google account has been linked to your existing account.', 'signInMessage');
                
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 1500);
            });
        });
    })
    .catch((linkError) => {
        console.error('Account linking error:', linkError);
        if (linkError.code === 'auth/wrong-password') {
            showMessage('Incorrect password. Please try again.', 'signInMessage');
        } else {
            showMessage('Failed to link accounts. Please try signing in with email/password.', 'signInMessage');
        }
    });
}

// Initialize Google buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to all Google buttons
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(button => {
        button.addEventListener('click', handleGoogleSignIn);
    });
    
    console.log('Authentication system initialized');
});

// Firestore functions for lost & found items
export async function saveItemToFirestore(item) {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const docRef = await addDoc(itemsRef, {
        ...item,
        createdAt: new Date().toISOString()
    });
    return docRef.id;
}

export async function getAllItemsFromFirestore() {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const q = query(itemsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
}

export async function deleteItemFromFirestore(itemId) {
    const db = getFirestore();
    const itemRef = doc(db, "lostFoundItems", itemId);
    await deleteDoc(itemRef);
}

export async function markAsReturnedInFirestore(itemId, userEnrollment) {
    const db = getFirestore();
    const itemRef = doc(db, "lostFoundItems", itemId);
    await updateDoc(itemRef, {
        status: 'returned',
        returnedDate: new Date().toISOString(),
        markedReturnedBy: userEnrollment
    });
}