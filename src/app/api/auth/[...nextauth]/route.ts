import config from "@/config";
import { createDefaultData } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface Props {
  user: User;
}
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user }: Props) {
      const {email} = user
      const userInDB = await prisma.users.findFirst({where:{email:email as string}})

      if(!userInDB){createDefaultData(user)}

      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
