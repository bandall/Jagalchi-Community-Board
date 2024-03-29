import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, { 
        // authSource: "admin",
        // user: "bandall",
        // pass: "sunf426617!",
        useNewUrlParser: true, 
        useUnifiedTopology: true,
 });
const db = mongoose.connection;

const handleOpen = () => console.log("Connected to MongoDB");
const handleError = (err) => console.log("DB Error", err);
db.on("error", handleError);
db.once("open", handleOpen);