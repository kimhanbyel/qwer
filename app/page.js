import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home(){
  const db = await client.db('QBank')
  const newP = await db.collection('quest').find().limit(5).sort({'_id': -1}).toArray();
  const hotP = await db.collection('quest').find().sort({"view": -1}).limit(5).toArray();
  const comments = await db.collection('comment').find().toArray();
  const session = await getServerSession(authOptions)

  return (
    <div className="main">
      <p className="title">문제은행 QBank</p>
      <marquee>단답형 문제들을 다 함께 풀이해요!</marquee>

      <div className="push new5">
        <p>새로운 문제 5개!!! 🌟</p>
        <div className="push_quest">
          { 
            newP.map(item => 
              item.solver?.includes(session?.user?.email) ? 
              <Link href={`/detail/${item._id}`} className="clear">{item.title}</Link>
              : <Link href={`/detail/${item._id}`}>{item.title}</Link>
            )
          }
        </div>
      </div>

      <div className="push hot5">
        <p>핫한 문제 5개!!! 🔥</p>
        <div className="push_quest">
          {
            hotP.map(item => 
              item.solver.includes(session?.user?.email) ? 
              <Link href={`/detail/${item._id}`} className="clear">{item.title}</Link>
              :<Link href={`/detail/${item._id}`}>{item.title}</Link>
            )
          }
        </div>
      </div>

      <div className="push">
        <p>최근 댓글들 💬</p>
        <div className="comment">
          {
            comments.map(comment => 
              <div className="comment_item">
                <Link href={`/detail/${comment.from_id}`}>
                  <h6>{comment.from_title}</h6>
                  <h2>{comment.context}</h2>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}