import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();


export class PengepulRepository{
    async getAll(){
        return await prisma.pengepul.findMany();
    }
}