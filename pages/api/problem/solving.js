import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions)
  const db = await client.db('QBank');
  const result = await db.collection('quest').findOne({'_id': new ObjectId(req.body.id)})

  let solver = result.solver;
  let solver_cnt = result.solver_cnt;
  let submit = result.submit + 1;
  let right  = result.right;
  let link = `/detail/${result._id}?msg=${encodeURIComponent('틀렸습니다')}`;
  let answer = '틀렸습니다..'

  console.log(req.body.example == result.answer)
  console.log(typeof(req.body.example), '정답 비교', typeof(result.answer))
  
  if(req.body.example === result.answer){
    solver.push(session.user.email)
    solver = [...new Set(solver)];
    solver_cnt = solver.length, right += 1;
    link = `/detail/${result._id}?msg=${encodeURIComponent('맞았습니다')}`; 
    answer = '맞았습니다!!'
  }
  else{
    let canisus = true;
    if(typeof(req.body.example) === 'object') req.body.example.map((item, i) => {if(result.answer[i] !== item) canisus = false;})
    else canisus = false;
    if(canisus){
      solver.push(session.user.email)
      solver = [...new Set(solver)];
      solver_cnt = solver.length, right += 1;
      link = `/detail/${result._id}?msg=${encodeURIComponent('맞았습니다')}`; 
      answer = '맞았습니다!!'
    }
  }

  const new_result = await db.collection('quest').updateOne(
      {'_id': new ObjectId(req.body.id)},
      {
          $set: {
              'solver': solver,
              'solver_cnt': solver_cnt,
              'submit': submit,
              'right':  right,
          }
      }
  )

  const new_solved = await db.collection('solved').insertOne({
    'name': session.user.name,
    'answer': answer,
    'date': formatDate(new Date()),
    'from_id': req.body.id,
    }
  )
  
  return res.redirect(302, link)
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  