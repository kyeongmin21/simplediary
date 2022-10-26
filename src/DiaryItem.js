
const DiaryItem = ({id, author, content, emotion, onDelete}) => {

  const deleteBtn = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="DiaryItem">
      <div key={id}>
        <div className="info">작성자 : {author} | 감정 : {emotion}
        <div className="date">시간: {new Intl.DateTimeFormat("ko", {dateStyle: "full"}).format(new Date())}</div>
        </div>
        <div className="content">{content}</div>
        <button onClick={deleteBtn} >삭제하기</button>
      </div>
    </div>
  )
};

export default DiaryItem;
