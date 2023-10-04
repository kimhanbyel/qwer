import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions)
  const data = req.body
  data.writer = session.user

  const db = await client.db('QBank');
  const result = await db.collection('comment').insertOne(data)
  return res.redirect(302, `/detail/${data.from_id}`)
}