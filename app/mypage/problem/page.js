import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Quest(){
    const session = await getServerSession(authOptions)
    console.log(session)
    const db = await client.db('QBank')
    const quests = await db.collection('quest').find({'writer': session.user}).toArray();
    const nonclear = await db.collection('quest').find({'writer': session.user, 'solver_cnt': 0}).toArray();

    return (
        <div className="quest">
            <h2>내가 만든 문제들</h2>
            <p>당신이 만든 문제들 입니다. {quests.length}개의 문제 중 {quests.length-nonclear.length}개가 해결되었습니다!</p>
            {
                quests.map(quest => 
                    <div>
                        <h4>{quest.title}</h4>
                        <Link href={`/detail/${quest._id}`}>
                            {quest.context}
                        </Link>
                    </div>
                )
            }
        </div>
    );
}