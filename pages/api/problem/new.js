import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  if (req.body.example) {
    const session = await getServerSession(req, res, authOptions);
    req.body.author = session.user;

    if(typeof(req.body.example) === 'array'){
      req.body.example = [...new Set(req.body.example)]
    }

    console.log(req.body)

    const db = await client.db('QBank');
    const result = await db.collection('quest').insertOne({
        'title': req.body.title,
        'context': req.body.context,
        'example': req.body.exam,
        'answer': req.body.example,
        'view': 0,
        'solver': [],
        'solver_cnt': 0,
        'submit': 0,
        "right": 0,
        "writer": session.user,
        'img': req.body.img,
        "type": req.body.type ?? "radio"
    });
    res.redirect(302, `/list/new?msg=${encodeURIComponent("데이터가 성공적으로 들어갔습니다")}`);
  }
  else return res.redirect(302, `/new?msg=${encodeURIComponent("문제가 발생하였습니다!")}`);
}