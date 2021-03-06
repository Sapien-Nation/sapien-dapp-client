// fixtures
import topic1 from 'fixtures/topic_1.json';
import topic2 from 'fixtures/topic_2.json';
import topic3 from 'fixtures/topic_3.json';
import topic4 from 'fixtures/topic_4.json';
import topic5 from 'fixtures/topic_5.json';

export const mockTopic = ({ ...rest } = {}) => ({
  ...topic1,
  ...rest,
});

export const mockTopics = () => {
  return [topic1, topic2, topic3, topic4, topic5];
};
