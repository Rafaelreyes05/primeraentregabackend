const express = require('express')
const router = require('./router/router')
const morgan = require('morgan')


const app = express ()
const PORT = 8080

app.use(express.json())
app.use(morgan('dev'))

router(app)


//Server listening
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})


