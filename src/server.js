const app = require("./app");
const db = require("./config/db");
const { serverPort } = require("./secret");




app.listen(serverPort, async()=> {
    console.log(`Server is running on port http://localhost:${serverPort}`);
    await db();
})

