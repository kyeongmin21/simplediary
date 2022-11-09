import DiaryItem from "./DiaryItem";
import {useContext} from 'react';
import {DiaryStateContext} from "./App";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>

      <div>
        {diaryList.map(item => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>

    </div>
  )
};

DiaryList.defaultProps = {
  diaryList: []
}

export default DiaryList;
