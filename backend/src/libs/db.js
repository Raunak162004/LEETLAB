import { PrismaClient } from "../generated/prisma/index.js"; // since you used custom output

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = db;

// import pkg from "@prisma/client";

// const { PrismaClient } = pkg; 

// const globalForPrisma = globalThis;

// export const db = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db;
// }