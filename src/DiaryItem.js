import React, {useState, useRef} from "react";

const DiaryItem = ({
                     id,
                     author,
                     content,
                     emotion,
                     created_date,
                     onRemove,
                     onEdit
                   }) => {

  const [isEdit, setIsEdit] = useState(false)
  const toggleIsEdit = () => setIsEdit(!isEdit)

  const [localContent, setLocalContent] = useState(content)
  const localContentInput = useRef()

  const handleRemove = () => {
    if (window.confirm(`${id}번쨰 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false)
    setLocalContent(content)
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus()
      return
    }
    if (window.confirm(`${id}번째 글을 수정하시겠습니까?`)) {
      onEdit(id, localContent)
      toggleIsEdit()
    }
  }

  return (
    <div className="DiaryItem">

      <div className="info">
        <span>작성자: {author}</span> | <span>감정: {emotion}</span>
        <div className="date">{new Date(created_date).toLocaleString()}</div>
      </div>

      <div className="content">
        {isEdit
          ? (<><textarea ref={localContentInput}
                          value={localContent}
                          onChange={(e) => setLocalContent(e.target.value)}/></>)
          : (<>{content}</>)}

      </div>

      {isEdit
        ? (<>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>)
        : (<>
          <button onClick={ handleRemove }>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>)
      }


    </div>
  )
}

export default React.memo(DiaryItem)
