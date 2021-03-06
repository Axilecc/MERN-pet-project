const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=> { console.log(`Server has been started at port ${PORT}...`)})
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()