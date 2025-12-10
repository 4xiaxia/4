import React, { useState } from 'react';
import { Input, Button, List, Spin, Avatar, Card, Typography } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { generateText } from '../services/aiService';

const { Title } = Typography;

// 消息类型定义
interface Message {
  sender: 'user' | 'ai';
  content: string;
}

const ChatPageEnhanced: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // 准备发送给AI的消息历史
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));
      history.push({ role: 'user', content: inputValue });

      // 调用AI服务 (默认使用siliconflow)
      const aiResponse = await generateText('siliconflow', history);

      // 假设AI的响应在 choices[0].message.content
      const aiMessageContent = aiResponse.choices[0]?.message?.content || '抱歉，我无法回答这个问题。';
      const aiMessage: Message = { sender: 'ai', content: aiMessageContent };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { sender: 'ai', content: '与AI的连接似乎断开了，请稍后再试。' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={<Title level={3}>🤖 智能客服</Title>}>
      <List
        style={{ height: '500px', overflowY: 'auto', marginBottom: '20px', padding: '10px' }}
        dataSource={messages}
        renderItem={item => (
          <List.Item style={{ borderBottom: 'none' }}>
            <List.Item.Meta
              avatar={item.sender === 'user' ? <Avatar icon={<UserOutlined />} /> : <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1677ff' }} />}
              title={item.sender === 'user' ? '您' : '智能助手'}
              description={item.content}
            />
          </List.Item>
        )}
      />
      <div style={{ display: 'flex' }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="请输入您的问题..."
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          loading={loading}
          style={{ marginLeft: '10px' }}
        >
          发送
        </Button>
      </div>
    </Card>
  );
};

export default ChatPageEnhanced;
