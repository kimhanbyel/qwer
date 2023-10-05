import client from "@/util/database"
import { ObjectId } from "mongodb";
import { redirect } from "next/dist/server/api-utils";
export default async function Delete(req, res){
  const id = JSON.parse(req.body).commentId;
  const db = await client.db('QBank');
  const result = await db.collection('comment').deleteOne({_id: new ObjectId(id)})
  
  return res.status(200).json('ok')
}