import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); //method Get -> READ Data

    router.post('/create-user', APIController.createNewUser); //method Post -> CREATE Data

    router.put('/update-user', APIController.updateUser); //method  Put -> update user

    router.delete('/delete-user/:id', APIController.deleteUser);//method Delete -> delete user

    return app.use('/api/v1/', router)
}

export default initAPIRoute;