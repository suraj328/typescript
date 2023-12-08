import  { Request, Response } from 'express';
import { People } from '../entity/People';
import { EntityManager, getManager, getRepository } from 'typeorm';
export default class HoldData{
    static personData =async (req:Request,res:Response) =>{
      const data = await People.find();
      console.table(data);
          res.json(data);
          
    }
    static insertPerson = async(req :Request,res:Response)=>{
      console.log(req.body);
      const reqData = req.body;
      const insertPersonData = await People.insert({
        name: reqData.name,
        semester:reqData.sem,
        faculty:reqData.faculty
      });
      if(insertPersonData.raw.affectedRows>0){
        res.status(200).json({dataInserted:true}).end();
        return;
      }
      res.status(500).json({dataInserted:false}).end();
    };

  static leftJoinData = async (req :Request,res:Response) => {
    
    const entityManager =getManager();

  }
}
