import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Comments from "./comments";

export default async function Detail(props){
    const msg = props.searchParams.msg
    const params = props.params
    
    const db = await client.db('QBank');
    const session = await getServerSession(authOptions);
    const result = await db.collection('quest').findOne({'_id': new ObjectId(params.id)});
    const comments = await db.collection('comment').find({'from_id': params.id}).sort({'_id': -1}).toArray();
    console.log(result)
    const viewup = await db.collection('quest').updateOne(
        {'_id': result._id},
        {$set: {
            'view': result.view + 1,
        }}
        )
    return (
        <div className="problem">
            {
                msg === '맞았습니다' ? 
                <div className="msg_answer">맞았습니다!!</div> :
                msg === '틀렸습니다' ?
                <div className="msg_wrong">틀렸습니다..</div> :""
            }
            <div className="p_head">
                <h1>{result.title}</h1>
                <img style={{width: "800px"}} src={result?.img}/>
                
                <h2>문제 설명</h2>
                <p>{result.context}</p>
            </div>

            <div className="p_body">
                <form action="/api/problem/solving" method="POST">
                    <h2>문제 보기</h2>
                    {
                        result.example.map((ex)=>{
                            return (
                                <div>
                                    {ex}<input type="radio" name='example' value={ex} required/>
                                </div>
                            );
                        })
                    }
                    <input type="hidden" name="id" value={params.id}/>
                    <div style={{margin: '10px'}}>
                        {session ? <button type="submit">제출하기</button> : ""}
                    </div>
                </form>
                {
                    result?.writer?.email === session?.user?.email ? 
                    <div className="editer">
                        <Link href={`/edit/${result._id}`} data={result }>수정</Link>
                        <Link href={`/api/problem/delete?id=${result._id}`}>삭제</Link>
                    </div> : ""
                }
            </div>
            
            <div className="p_stats">
                <h2>문제 통계</h2>
                <table>
                    <thead>
                        <tr>
                            <th>조회수</th>
                            <th>맞춘 사람 수</th>
                            <th>제출 수</th>
                            <th>정답 수</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td>{result.view}</td>
                            <td>{result.solver_cnt}</td>
                            <td><Link href={`/detail/${params.id}/solved`}>{result.submit}</Link></td>
                            <td>{result.right}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="p-comment">
                <h2>댓글</h2>
                {
                    session ?
                    <form action="/api/comment/new" method="POST">
                        <input type="text" className="input" name="context" required/>
                        <input type="hidden" name="from_id" value={params.id}/>
                        <input type="hidden" name="from_title" value={result.title}/>
                        <button className="btn">입력</button>
                    </form>    
                    : ""
                }
                <div className="commentbody">
                    <Comments comments={comments}/>
                </div>
            </div>
        </div>
    );
}