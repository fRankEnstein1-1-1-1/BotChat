import { connect } from 'mongoose';
import { disconnect } from 'process';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log("Error from database connection" + error);
        throw new Error("Cant connect to MongoDB");
    }
}
async function disconnecttoDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log("Error from database connection" + error);
        throw new Error("Cant connect to MongoDB");
    }
}
export { connectToDatabase, disconnecttoDatabase };
//# sourceMappingURL=connections.js.map