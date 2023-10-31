import authOption from "@/app/auth/authOption"
import NextAuth, { NextAuthOptions } from "next-auth"



// const prisma = new PrismaClient()

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }