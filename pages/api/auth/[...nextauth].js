import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

//import {FirebaseAdopter} from "@next-auth/firebase-adopter";

// import {db} from "../../../firebase"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

//   adapter:FirebaseAdopter(db)
})


