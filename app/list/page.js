import Link from "next/link";
export default async function List(){
  let asdf = [
    {'_id': '1234hv89y431', 'title': '안녕하세요를 영어로?',
    'view': '0', 'solver': '0', 'rate': '0'},
    {'_id': '112zxcv31324', 'title': '한별이를 영어로?',
    'view': '0', 'solver': '0', 'rate': '0'},]
  return (
    <div className="list">
      <h2>최근 문제들</h2>
      <table>
        <thead>
          <tr>
            <th>문제 번호</th>
            <th>문제 제목</th>
            <th>문제 조회수</th>
            <th>문제 푼 사람 수</th>
            <th>문제 정답 비율</th>
          </tr>
        </thead>
        <tbody>
        {
          // 대충 tr
          asdf.map(q => {
            return (
              <tr>
                <td>{q._id}</td>
                <td><Link href={`/detail/${q._id}`}>{q.title}</Link></td>
                <td>{q.view}</td>
                <td>{q.solver}</td>
                <td>{q.rate}%</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  );
}