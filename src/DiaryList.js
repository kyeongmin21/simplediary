import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList, onDelete}) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>

      <div>
        {diaryList.map(item => (
          <DiaryItem key={item.id} {...item} onDelete={onDelete}/>
        ))}
      </div>

    </div>
  )
};

DiaryList.defaultProps = {
  diaryList: []
}

export default DiaryList;
