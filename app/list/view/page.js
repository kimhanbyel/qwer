import ProblemNav from "@/app/problemnav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function List(){
  const db = await client.db('QBank');
  const quest = await db.collection('quest').find().sort({'view': -1}).toArray();
  const session = await getServerSession(authOptions)
  return (
    <div className="list">
      <h2>모든 문제들</h2>
      <marquee>정렬 순서는 가장 조회수가 많은 것부터입니다.</marquee>
      <table>
        <thead>
          <tr>
            <th>문제 제목</th>
            <th>문제 조회수</th>
            <th>문제 푼 사람 수</th>
            <th>문제 정답 비율</th>
          </tr>
        </thead>
        <tbody>
        {
          // 대충 tr
          quest.map((q, i) => {
            return (
              <tr>
                <td><Link href={`/detail/${q._id}`}>{q.title}</Link>{q.solver?.includes(session?.user?.email) ? "✅": ""}</td>
                <td>{q.view}</td>
                <td>{q.solver_cnt}</td>
                <td>{q.right/q.submit * 100}%</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
      <ProblemNav/>
    </div>
  );
}