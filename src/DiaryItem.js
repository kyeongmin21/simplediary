
const DiaryItem = ({id, author, content, emotion}) => {
  return (
    <div className="DiaryItem">
      <div key={id}>
        <div className="info">작성자 : {author} | 감정 : {emotion}
        <div className="date">시간: {new Intl.DateTimeFormat("ko", {dateStyle: "full"}).format(new Date())}</div>
        </div>
        <div className="content">{content}</div>
      </div>
    </div>
  )
};

export default DiaryItem;
