import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();


export class PengepulRepository{
    async getAll(){
        return await prisma.pengepul.findMany();
    }

    async getAllByStatusDiterima() {
        console.log('Querying database for pengepul with status DITERIMA...');
        const result = await prisma.pengepul.findMany({
            where: {
                status: 'DITERIMA', // Enum yang sesuai
            },
        });
        console.log('Query result:', result);
        return result;
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