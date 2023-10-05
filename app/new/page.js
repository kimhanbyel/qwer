'use client'
import { useState } from "react";

export default function New(){
    const [image, setImage] = useState('');
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");

    const examCreator = (e) => {
        if (text) {
            e.preventDefault();
            setItems([...items, text]);
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
    
    return (
        <div className="new">
            <form action="/api/problem/new" method="POST">
                <h2>새로운 문제를 만들어보아요!</h2>
                <div className="new-main">
                    <h5>제목</h5>
                    <input className="make-title" name="title" maxLength={20} placeholder="20자 이내로 짓을 수 있어요!" required/>
                    <h5>사진</h5>
                    <img style={{width:"640px"}} src={image}/>
                    <input type="file" onChange={imageLoadHandler}/>
                    <h5>글 내용</h5>
                    <textarea name="context" className="make-context" placeholder="문제를 적는 곳이니 정확하고 이해하기 쉽게 해주세요!!" required></textarea>
                </div>
                <div className="new-example">
                    <h5>보기 넣기</h5>
                    {
                        items.map((item, i) => {
                            return (
                                <div key={i}><input type="hidden" name="exam" value={item}/><input type="radio" name="example" value={item} required/> {item}<button onClick={()=>{deleteHandler(i)}}>삭제</button></div>
                            )}
                        )
                    }
                    <input placeholder="보기를 넣고 엔터를 눌러주세요!"
                            value={text} onChange={e=>setText(e.target.value)}/>
                    <button type='button' onClick={examCreator}>추가</button>
                    <input type="hidden" name="img" value={image}/>
                </div>

                <div className="new-example">
                    
                </div>
                {items.length>1 ? <button type="submit">등록</button> : ""}
            </form>
        </div>
    );
}