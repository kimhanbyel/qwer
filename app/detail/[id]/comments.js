'use client'
export default function Comments({params, comments}){
  return(
    <div>
      {   
        comments.map(comment => {
            return (
                <div className="commentdata">
                    <p>{comment.writer.name}</p>
                    <p>{comment.context}<span onClick={(e)=>{
                        fetch('/api/comment/delete', {
                          method: "POST",
                          body: JSON.stringify({'commentId': comment._id, 'fromId': comment.from_id})
                        })
                        .then(res => res.json())
                        .then(() => {
                          e.target.parentNode.parentNode.style.display = 'none'
                        })
                    }}>❌</span></p>
                </div>
            );
        })
      }
    </div>
  )
}