import express from 'express'
import cors from 'cors'
import serviceRouter from './routes/service.routes.js'
import featuresRoutes from './routes/features.routes.js'
import latestRoutes from './routes/latest.routes.js'
import orderRoutes from './routes/admin/order.routes.js'
import agentRoutes from './routes/admin/agents.routes.js'
import propertyRoutes from './routes/admin/property.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/user.js'
import dbConfig from './config/db.js'

dotenv.config();

const app = express()

app.use(cors())

dbConfig()

app.use(express.json())

app.use('/api/v1/service', serviceRouter)
app.use('/api/v1/features', featuresRoutes)
app.use('/api/v1/latest', latestRoutes)
app.use('/categories', categoriesRoutes)
app.use('/api/v1/admin', orderRoutes)
app.use('/api/v1/admin', agentRoutes)
app.use('/api/v1/admin/property', propertyRoutes)



app.listen(3000, ()=> {
    console.log('Server is running on 3000')
})