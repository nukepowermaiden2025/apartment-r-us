import express from 'express'
import mysql from 'mysql2/promise';
import { Consumer, Kafka, Producer } from 'kafkajs';



const app = express()
const port = 3000

app.use(express.json())//the new body parser since v4

//This can stay and can be passed to the refactored files
const kafka = new Kafka({
  clientId: 'apartments-r-us',
  brokers: ['localhost:29092'],
})



let producer: Producer
let consumer: Consumer

app.post('/', async (req, res) => {
    // const pool = await connectDB()
    // const [rows, fields] = await pool.query(`select * from beta_test.apartment a where a.community_id = '29e6c13f-eac5-11ee-b432-0242ac110002';`)
  // console.log(rows)
  const producer = await getProducer()
  await producer.connect()
  console.log(`This is the producer ${JSON.stringify(producer)}`)
  console.log('hello worlds')
  const value =  {
    eventId: 1,
    timestamp: Date.now(),
    message: 'cookies are my tacos are next in line'
  }
  const stringValue = JSON.stringify(value)
  await producer.send({
    topic: 'apartment-r-us',
    messages: [
      {
        value: stringValue
      }
    ]
  })
  
  res.status(200).json({results: "rows"})
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


//Move this to a producer file
async function getProducer() {
  if (producer) {
    return  producer
  }
  producer = await kafka.producer()
  
  return producer
}


async function getConsumer() {
  console.log('running the consumer')
  if (!consumer) {
    consumer = await kafka.consumer({ groupId: 'important-uuid-123' })
  }

  await consumer.connect()
  await consumer.subscribe({
    topics: ['apartment-r-us']
  })

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log('DDDDDDDDDDDDD CONSUMER')
      console.log({
        value: message.value?.toString()
      })
    }
  })
 


}

//Move this to a consumer function

getConsumer().then(() => {
  console.log('consumer is running')
})
