import express from 'express'
import cors from 'cors'
import serviceRouter from './routes/service.routes.js'
import featuresRoutes from './routes/features.routes.js'
import latestRoutes from './routes/latest.routes.js'
import orderRoutes from './routes/admin/order.routes.js'
import agentRoutes from './routes/admin/agents.routes.js'

import categoriesRoutes from './routes/categories.routes.js'
import dotenv from 'dotenv'
import dbConfig from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import testRoutes from './routes/test.routes.js'
import propertyRoutes from './routes/property.routes.js'
import adminPropertyRoutes from './routes/admin/property.routes.js'


dotenv.config();

const app = express()

app.use(cors())

dbConfig()

app.use(express.json())
app.use('/media',express.static('uploads'))  // display from uploads folder

app.use('/api/v1/service', serviceRouter)
app.use('/api/v1/features', featuresRoutes)
app.use('/api/v1/latest', latestRoutes)
app.use('/categories', categoriesRoutes)
app.use('/api/v1/admin', orderRoutes)
app.use('/api/v1/admin', agentRoutes)
app.use('/api/v1/admin/property', adminPropertyRoutes)
app.use('/api/v1/property', propertyRoutes) 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/test', testRoutes)


app.listen(3000, ()=> {
    console.log('Server is running on 3000')
})