import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Comment(){
    const session = await getServerSession(authOptions)
    const db = await client.db('QBank')
    const comments = await db.collection('comment').find({'writer': session.user}).toArray();
    return (
        <div>
            <h2>내가 쓴 댓글</h2>
            <div className="comment">
                {
                    comments.map(comment => 
                        <div>
                            <h6>{comment.from_title}</h6>
                            <Link href={`/detail/${comment.from_id}`}>
                                {comment.context}
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}