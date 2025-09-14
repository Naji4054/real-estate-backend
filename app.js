import express from 'express'
import cors from 'cors'
import serviceRouter from './routes/service.routes.js'
import featuresRoutes from './routes/features.routes.js'
import latestRoutes from './routes/latest.routes.js'
import orderRoutes from './routes/admin/order.routes.js'
import agentRoutes from './routes/admin/agents.routes.js'
import propertyRoutes from './routes/admin/property.routes.js'
import categoriesRoutes from './routes/categories.routes.js'


const app = express()

app.use(cors('*'))


app.use('/service', serviceRouter)
app.use('/features', featuresRoutes)
app.use('/latest', latestRoutes)
app.use('/categories', categoriesRoutes)
app.use('/admin', orderRoutes)
app.use('/admin', agentRoutes)
app.use('/admin/property', propertyRoutes)



app.listen(3000, ()=> {
    console.log('Server is running on 3000')
})