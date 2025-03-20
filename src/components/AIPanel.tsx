import React, { useState } from 'react';
import { Card, Button, InputNumber, Space, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setPlayerStake } from '../store/slices/gameSlice';

const { Text } = Typography;

const AIPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { currentQuestion, playerStake, minBetAmount, maxBetAmount } = useSelector(
    (state: RootState) => state.game
  );
  const { isConnected } = useSelector((state: RootState) => state.wallet);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleBetChange = (value: number | null) => {
    if (value && value >= minBetAmount && value <= maxBetAmount) {
      dispatch(setPlayerStake(value));
    }
  };

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    // TODO: 处理答题逻辑
  };

  if (!isConnected) {
    return (
      <Card title="AI 出题面板" className="shadow-lg">
        <div className="text-center py-8">
          <Text type="secondary">请先连接钱包</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card title="AI 出题面板" className="shadow-lg">
      <div className="space-y-4">
        {currentQuestion ? (
          <>
            <div className="text-lg font-medium">{currentQuestion.content}</div>
            <Space direction="vertical" className="w-full">
              {currentQuestion.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  type={selectedOption === index ? 'primary' : 'default'}
                  className="w-full text-left"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </Space>
            <div className="mt-4">
              <Text>投注金额：</Text>
              <InputNumber
                min={minBetAmount}
                max={maxBetAmount}
                value={playerStake}
                onChange={handleBetChange}
                className="w-32"
                formatter={(value) => `${value || ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => Number(value?.replace(/[^\d.-]/g, '') || '0')}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Text type="secondary">等待 AI 出题...</Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIPanel;
