import express from 'express'
import cors from 'cors'
import serviceRouter from './routes/service.routes.js'
import featuresRoutes from './routes/features.routes.js'
import latestRoutes from './routes/latest.routes.js'


const app = express()

app.use(cors('*'))


app.use('/service', serviceRouter)
app.use('/features', featuresRoutes)
app.use('/latest', latestRoutes)



app.listen(3000, ()=> {
    console.log('Server is running on 8000')
})