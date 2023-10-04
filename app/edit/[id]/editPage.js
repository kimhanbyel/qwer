'use client'
import { useState } from "react";

export default function EditPage({data}){
    console.log(data)
    const [items, setItems] = useState(data.example);
    const [text, setText] = useState('');

    const examCreator = (e) => {
        if (text) {
          e.preventDefault();
          setItems([...items, text]);
          setText("");
        }
      }

    const deleteHandler = (e) => {
        e.target.parentNode.remove();
      }
    
    return (
        <div className="new">
            <form action="/api/problem/edit" method="POST">
                <h2>문제를 수정해봐요!</h2>
                <div className="new-main">
                    <h5>제목</h5>
                    <input className="make-title" name="title" defaultValue={data.title} maxLength={20} placeholder="20자 이내로 짓을 수 있어요!"/>
                    <h5>글 내용</h5>
                    <textarea name="context" className="make-context" placeholder="문제를 적는 곳이니 정확하고 이해하기 쉽게 해주세요!!">{data.context}</textarea>
                </div>
                <div className="new-example">
                    <h5>보기 넣기</h5>
                    {
                        items.map((item, i) => {
                            return (
                              <div key={i}>
                                <input type="hidden" name="example" value={item}/>
                                {
                                  data.answer.includes(item) ?
                                  <><input type="radio" name="example" value={item} defaultChecked/> {item} </>:
                                  <><input type="radio" name="example" value={item}/> {item} </>
                                }
                                <button type="button" onClick={deleteHandler}>보기 삭제</button>
                              </div>
                            )}
                          )
                    }
                    <input placeholder="보기를 넣고 엔터를 눌러주세요!"
                           value={text} onChange={e=>setText(e.target.value)}/>
                    <input type="hidden" name="_id" value={data._id.toString()} />
                    <button type='button' onClick={examCreator}>추가</button>
                </div>
                {
                    items.length>1 ? <button type="submit">수정</button> : ""
                }
            </form>
        </div>
    );
}