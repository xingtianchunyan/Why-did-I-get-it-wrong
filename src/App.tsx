import React from 'react';
import { Layout } from 'antd';
import AIPanel from './components/AIPanel';
import QuestionHistory from './components/QuestionHistory';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div>
              <AIPanel />
            </div>
            <div>
              <QuestionHistory />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
