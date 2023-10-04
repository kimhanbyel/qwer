import client from "@/util/database";
import Link from "next/link";

export default async function Solved({params}){
    const db = await client.db("QBank")
    const result = await db.collection('solved').find({'from_id': params.id}).sort({'_id': -1}).toArray();
    console.log(result)
    return (
        <div className="solved">
            <Link href={`/detail/${params.id}`}>이전으로</Link>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>결과</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.map(i =>{
                            return (
                                <tr>
                                    <td>{i.name}</td>
                                    {i.answer === '맞았습니다!!' ? <td className="clear">맞았습니다!!</td>:<td className="dontclear">틀렸습니다..</td>}
                                    <td>{i.date}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}