'use client'
export default function Comments({session, params, comments}){
  return(
    <div>
      {   
        comments.map((comment, i) => {
            return (
                <div className="commentdata" key={i}>
                    <p>{comment.writer?.name}</p>
                    <p>{comment.context}
                    {
                      session?.user?.name === comment?.writer?.name ? <span onClick={(e)=>{
                          fetch('/api/comment/delete', {
                            method: "POST",
                            body: JSON.stringify({'commentId': comment._id, 'fromId': comment.from_id})
                          })
                          .then(res => res.json())
                          .then(() => {
                            e.target.parentNode.parentNode.style.display = 'none'
                          })
                      }}>❌</span> : ""
                    }
                    </p>
                </div>
            );
        })
      }
    </div>
  )
}