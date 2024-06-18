import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";


dotenv.config(
    {
          path: './env'
    }
);
connectDB()
.then(() =>{

    app.on("error",(error) => {
        console.log("SERVER ERROR:",error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Listening on port ${process.env.PORT || 8000}`);
    })
})
.catch((err) =>{
    console.log("MONGODB CONE CTION ERROR:",err);
})