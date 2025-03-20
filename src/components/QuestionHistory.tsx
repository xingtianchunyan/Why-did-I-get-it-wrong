import React from 'react';
import { Card, List, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const QuestionHistory: React.FC = () => {
  const { questionHistory } = useSelector((state: RootState) => state.game);

  return (
    <Card title="历史问题" className="shadow-lg">
      <List
        dataSource={questionHistory}
        renderItem={(question) => (
          <List.Item>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-lg">{question.content}</div>
                <Tag color="blue">{question.category}</Tag>
              </div>
              <div className="text-sm text-gray-500">
                正确答案: {question.correctAnswer}
              </div>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: '暂无历史记录' }}
      />
    </Card>
  );
};

export default QuestionHistory;
