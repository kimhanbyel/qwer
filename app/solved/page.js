import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function MySolved(){
    const session = await getServerSession(authOptions)
    const db = await client.db('QBank')
    const solved = await db.collection('quest').find({'solver': session.user.email}).toArray();
    const solved_road = await db.collection('solved').find({'name':session.user.name}).toArray();
    const allProblemLength = await (await db.collection('quest').find().toArray()).length;
    return (    
        <div>
            <h2>내가 풀이한 문제들</h2>
            <p>당신의 휼륭한 업적을 대단히 생각합니다! {solved.length}/{allProblemLength} 해결함!</p>
            {
                solved.map(e => {
                    let n = e.solver.indexOf(session.user.email)+1
                    return (
                        <Link className="road" href={`/detail/${e._id}`}>
                            {e.title}, {n==1 ? <p className="first">{n+"번째 정답자"}</p>
                                    : n==2 ? <p className="second">{n+"번째 정답자"}</p>
                                    : n==3 ? <p className="third">{n+"번째 정답자"}</p>
                                    : <p>{n+"번째 정답자"}</p>}
                        </Link>
                    );
                })
            }
            <h2>문제 풀이했던 길</h2>
            <p>과거의 길을 걸어가봅시다.</p>
            {
                solved_road.map(road => {
                    return (
                        <div>
                            <Link href={`/detail/${road.from_id}`}>{road.answer}, {road.date}</Link>
                        </div>
                    );
                })
            }
        </div>
    ); 
}