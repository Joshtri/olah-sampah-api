import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();


export class PengepulRepository{
    async getAll(){
        return await prisma.pengepul.findMany();
    }
    
    async create(data) {
        return await prisma.pengepul.create({
            data: data,
        });
    }
    
    async getPengepulById(id) {
        return await prisma.pengepul.findUnique({
          where: { id },
        });
    }
}