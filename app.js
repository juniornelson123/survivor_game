import express from 'express'
import path from 'path'

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/modules", express.static(path.join(__dirname, "node_modules")))

app.get("/", (req, res) => {
    res.render("index")
})


app.listen(3002, () => {
    console.log("running in port 3002")
} )
