'use client'
import { useState } from "react";

export default function EditPage({data}){
    const [image, setImage] = useState(data.img);
    const [items, setItems] = useState(data.example);
    const [text, setText] = useState('');
    const [type, setType] = useState(data.type)

    const examCreator = (e) => {
        if (text) {
          e.preventDefault();
          setItems([...new Set(items), text]);
          setText("");
        }
      }

    const imageLoadHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result);
    }

    const deleteHandler = (indexToDelete) => {
      setItems(items.filter((item, index)=>index!==indexToDelete));
    }

    const onChangeType = (e) => {
      setType(e.target.value);
    }
    
    return (
        <div className="new">
            <form action="/api/problem/edit" method="POST">
                <h2>문제를 수정해봐요!</h2>
                <div className="new-main">
                    <h5>제목</h5>
                    <input className="make-title" name="title" defaultValue={data.title} maxLength={20} placeholder="20자 이내로 짓을 수 있어요!"/>
                    <h5>사진</h5>
                    <img style={{width:"640px"}} src={image}/>
                    <input type="file" onChange={imageLoadHandler}/>
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
                                  <><input type={`${type}`} name="answer" value={item} defaultChecked/> {item} </>:
                                  <><input type={`${type}`} name="answer" value={item}/> {item} </>
                                }
                                <button type="button" onClick={()=>deleteHandler(i)}>보기 삭제</button>
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
                  type === 'radio' ? 
                  <div className="select_type">
                    <p>객관식(하나)<input type="radio"  name="type" value='radio' onChange={onChangeType} defaultChecked/></p>
                    <p>객관식(여러)<input type="radio"  name="type" value='checkbox' onChange={onChangeType}/></p> :
                  </div> :
                  <div className="select_type">
                    <p>객관식(하나)<input type="radio"  name="type" value='radio' onChange={onChangeType}/></p>
                    <p>객관식(여러)<input type="radio"  name="type" value='checkbox' onChange={onChangeType} defaultChecked/></p> :
                  </div>
                }
                {
                    items.length>1 ? <button type="submit">수정</button> : ""
                }
            </form>
        </div>
    );
}