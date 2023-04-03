
const app = require('./app')

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server runs on port ${port}. Emperor protects.`)
})