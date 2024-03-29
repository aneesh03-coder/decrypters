import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import {FirebaseAdapter} from "@next-auth/firebase-adapter";
 import {db} from "../../../firebase"

//  import {
//   collection,
//   query,
//   getDocs,
//   where,
//   limit,
//   doc,
//   getDoc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   runTransaction,
// } from "firebase/firestore";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

//  adapter:FirebaseAdapter({
//   db,
//   collection,
//   query,
//   getDocs,
//   where,
//   limit,
//   doc,
//   getDoc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   runTransaction,
// })
})


