import { Request, Response } from "express";
import SystemUser from "../db/models/SystemUser";
export default class SytsemUserController {
  public async add(req: Request, res: Response) {
    try {
      const { username, email } = req.body;
      const newUser = await SystemUser.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public async findAll(req: Request, res: Response) {
    try {
      const systemUsers = await SystemUser.findAll();
      res.json(systemUsers);
    } catch (error) {
      console.error("Error finding system users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
