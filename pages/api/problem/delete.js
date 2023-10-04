import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    const id = req.query.id;
    const db = await client.db('QBank');
    const result = await db.collection('quest').deleteOne({_id: new ObjectId(id)})
    
    return res.redirect(302, `/list?msg=${encodeURIComponent("데이터가 성공적으로 삭제되었습니다.")}`);
}