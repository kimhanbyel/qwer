import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  let cpObj = {...req.body}
  delete cpObj._id;
  const db = await client.db('QBank');
  const result = await db.collection('quest').updateOne({_id:new ObjectId(req.body._id)},
  {$set: {...cpObj}}
  )
  res.redirect(302, `/detail/${req.body._id}`);
}