import express from 'express'
import mysql from 'mysql2/promise';



const app = express()
const port = 3000

app.use(express.json())//the new body parser since v4



//Question1
//throw new Error("New error message", { cause: err });

app.get('/', async (req, res) => {
    const pool = await connectDB()
    const [rows, fields] = await pool.query(`select * from beta_test.apartment a where a.community_id = '29e6c13f-eac5-11ee-b432-0242ac110002';`)
    console.log(rows)
  console.log(fields)
  
  res.status(200).json({results: rows})
})

app.listen(port, () => {
    console.log(`I have all the environments ${process.env.TEST_VALUE}`)
    console.log(`Apartments are the best http://localhost:${port}/`)
})

async function connectDB() {
  return await mysql.createConnection({
    host: 'mysql',//This is the host name of the docker container where the database is running. Need to call it this because that is the container name
    user: 'root',
    password: 'secret-root',
    database: 'beta_test',
    port: 3306
  })
}