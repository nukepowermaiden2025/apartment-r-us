import express from 'express'

const app = express()
const port = 3000

app.use(express.json())//the new body parser since v4

app.get('/', (req, res) => {
    res.send('Hello World I am hear with a vengence')
})

app.listen(port, () => {
    console.log(`I have all the environments ${process.env.TEST_VALUE}`)
    console.log(`Apartments are the best http://localhost:${port}/`)
})