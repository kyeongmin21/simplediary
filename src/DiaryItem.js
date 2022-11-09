import React, {useState, useRef, useContext} from "react";
import {DiaryDispatchContext} from './App';

const DiaryItem = ({id, author, content, emotion}) => {
  const {onDelete, onEdit} = useContext(DiaryDispatchContext)

  const localContentInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id)
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    onEdit(id, localContent)
    toggleIsEdit();  // 토글닫기
  }
  return (
    <div className="DiaryItem">
      <div key={id}>
        <div className="info">작성자 : {author} | 감정 : {emotion}
        <div className="date">시간: {new Intl.DateTimeFormat("ko", {dateStyle: "full"}).format(new Date())}</div>
        </div>
        <div className="content">
          {isEdit ? (
            <div>
              <textarea ref={localContentInput}
                        value={localContent}
                        onChange={e => setLocalContent(e.target.value)} />
              </div>
          ): (
            <div>{content}</div>
          )}
        </div>
        {isEdit ? (
          <div>
            <button onClick={handleQuitEdit} >수정취소</button>
            <button onClick={handleEdit}>수정완료</button>
          </div>
        ) : (
          <div>
            <button onClick={handleDelete} >삭제하기</button>
            <button onClick={toggleIsEdit} >수정하기</button>
          </div>
        )}

      </div>
    </div>
  )
};

export default React.memo(DiaryItem);
