import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Quest(){
    const session = await getServerSession(authOptions)
    const db = await client.db('QBank')
    const quests = await db.collection('quest').find({'email': session.user.eamil}).toArray();

    return (
        <div className="quest">
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