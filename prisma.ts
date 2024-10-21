import { Prisma, PrismaClient } from '@prisma/client'


const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [{emit:'event', level:"query"}]
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()



if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma


// remove for production

// prisma.$on("query", (e:Prisma.QueryEvent)=> {
//    console.log(e.params);
//    console.log.apply(e.duration);
//    console.log("----------------------------");
// })
