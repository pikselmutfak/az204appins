const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const appIns = require('applicationinsights')
appIns.setup()
.setSendLiveMetrics(true)
.start()

const app = express()
app.use(bodyParser.json())

app.get('/api/event', async (req, res) => {

    const telemetry = appIns.defaultClient

    telemetry.trackEvent({
        name: 'Some Event',
        properties: {
            orders: 10,
            users: 200
        }
    })

    telemetry.trackMetric({
        name: 'Some Metric',
        value: 92
    })

    res.send('some event happened')
})

app.get('/api/fail', async (req, res) => {

    const telemetry = appIns.defaultClient

    telemetry.trackException({
        exception: new Error('Önemli bir hata oluştu !!')
    })

    res.send('some failure happened')
})

app.get('/api/hello', async (req, res) => {

    const env = JSON.stringify(process.env)

    // const mysecret = "12345"
    const mysecret = process.env.mysecret

    res.send("my secret is: "+mysecret)
})

app.get('/api/merhaba', (req, res) => {

    res.send('Merhaba Dünya')
})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName','lastName'])
    console.log(body)
    res.send('Hello '+body.firstName+' '+body.lastName)
})

app.listen(8080, () => {
    console.log('app server is running')
})