import express, { Request, Response } from 'express';
import HoldData from '../model/holdData';
const router = express.Router();

// default gateway
router.get('/',(req:Request,res:Response,)=>{
    res.send("Server is working")
});

router.get('/person',HoldData.personData);
router.post('/insert',HoldData.insertPerson);
router.get('/leftjoin',HoldData.leftJoinData);


export default router;