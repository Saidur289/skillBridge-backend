import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 3001
async function main() {
    try {
        await prisma.$connect()
        app.listen(PORT, () => {
            console.log(`Database is connected on PORT:${PORT}`);
        })
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        process.exit(1)
    }

}
main()