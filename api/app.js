const fs = require('fs')
const express = require('./node_modules/express')

const app = express()

// file reading methods
const loadJobList = () => JSON.parse(fs.readFileSync('mock/joblist.json'))

const loadJobDetails = () => JSON.parse(fs.readFileSync('mock/jobdetail.json'))

// middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// endpoints
app.get('/joblist', (req, res) => {
  const jobList = loadJobList()

  res.send({
    version: 1.0,
    statusCode: 200,
    result: {
      items: jobList,
      total: jobList.length 
    }
  })
})

app.get('/jobdetail/:id', (req, res) => {
  const jobDetails = loadJobDetails()
  const detail = jobDetails.find(j => j.jobId === req.params.id)

  if (detail) {
    res.send({
      version: 1.0,
      statusCode: 200,
      result: detail
    })
  } else {
    res.status(404).send()
  }
})

app.listen(3000, () => console.log('----- API Server Live on Port 3000 -----'))
