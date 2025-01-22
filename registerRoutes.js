import signuproutes from './module/signup_pages/routes/signuproutes.js'
import warehouseRoute from './module/warehouse-management/routes/warehouseRoute.js'
import {upload} from './middlewares/multer-fileuploads.js'

const registerRoutes = (app) => {
    // Register your routes here
    app.use('/api/userlogindetails', signuproutes);
    app.use('/api/warehouseManagement', upload.single('productImage'), warehouseRoute)
  
    // Add any other routes similarly
  };
  
  export default registerRoutes;