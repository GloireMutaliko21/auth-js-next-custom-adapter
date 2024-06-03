import NextAuth from "next-auth";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {
  UserEntity,
  AccountEntity,
  SessionEntity,
  VerificationTokenEntity,
} from "@/libs/entities";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Github({ allowDangerousEmailAccountLinking: true }),
  ],
  adapter: TypeORMAdapter(process.env.AUTH_TYPEORM_CONNECTION ?? "", {
    entities: {
      AccountEntity,
      SessionEntity,
      UserEntity,
      VerificationTokenEntity,
    },
  }),
  callbacks: {
    async signIn({ account }) {
      if (account) {
        return true;
      }
      return false;
    },
  },
  debug: true,
});
