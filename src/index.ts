import express from "express"
import { AppDataSource } from "./data-source"
import routeThread from "./router/ThreadRouter"
import routeUser from "./router/UserRouter"
import routeReplies from "./router/RepliesRouter"
import routeFollows from "./router/FollowsRoute"
import routeLikes from "./router/LikesRoute"
import routeAuth from "./router/AuthRoute"
import cors from "cors"




AppDataSource.initialize()
.then(async () => {
    const app = express()
    const port = 3000
    app.use(cors())
    app.use(express.json())
    app.use("/api/v1",routeThread)
    app.use("/api/v1",routeUser)
    app.use("/api/v1",routeReplies)
    app.use("/api/v1",routeFollows)
    app.use("/api/v1",routeLikes)
    app.use("/api/v1",routeAuth)
    


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    
        
    })
})
.catch(error => console.log("Ini errror",error))