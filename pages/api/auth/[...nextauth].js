import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '8b5bd6ee7d1dd1d387df',
      clientSecret: '2e29938018013e78ce03e470c2d1289f57c44fd2',
    }),
    // ...add more providers here
  ],
  secret: 'qwer1234'
}

export default NextAuth(authOptions)