import Link from "next/link";

export default function Home(){
  const comments = [
    {'title': '한별이를 영어로?', 'comment': "김정은 아님?"},
    {'title': '한별이를 영어로?', 'comment': "김정은 아님?"},
    {'title': '한별이를 영어로?', 'comment': "김정은 아님?"},
    {'title': '한별이를 영어로?', 'comment': "김정은 아님?"},
    {'title': '한별이를 영어로?', 'comment': "김정은 아님?"},
  ]
  return (
    <div className="main">
      <p className="title">문제은행 QBank</p>
      <marquee>단답형 문제들을 다 함께 풀이해요!</marquee>

      <div className="push new5">
        <p>새로운 문제 5개!!! 🌟</p>
        <div className="push_quest">
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
        </div>
      </div>

      <div className="push hot5">
        <p>핫한 문제 5개!!! 🔥</p>
        <div className="push_quest">
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`/proplem`}>문제번호, 문제제목</Link>
          <Link href={`proplem`}>문제번호, 문제제목</Link>
        </div>
      </div>

      <div className="push comment">
        <p>최근 댓글들</p>
        {
          comments.map(comment => 
            <div className="comment_item">
              <h6>{comment.title}</h6>
              <h3>{comment.comment}</h3>
            </div>
          )
        }
        <div>

        </div>
      </div>
    </div>
  );
}