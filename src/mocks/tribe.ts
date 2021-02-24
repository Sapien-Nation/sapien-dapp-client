// fixtures
import tribe1 from 'fixtures/tribe_1.json';
import tribe2 from 'fixtures/tribe_2.json';
import tribe3 from 'fixtures/tribe_3.json';
import tribe4 from 'fixtures/tribe_4.json';
import channel1 from 'fixtures/channel_1.json';
import channel2 from 'fixtures/channel_2.json';
import channel3 from 'fixtures/channel_3.json';
import channel4 from 'fixtures/channel_4.json';

export const mockTribe = ({ ...rest } = {}) => ({
  ...tribe1,
  channels: [channel1, channel2],
  ...rest,
});

export const mockTribes = () => {
  return [
    { ...tribe1, channels: [channel2] },
    { ...tribe2, channels: [channel1, channel3] },
    { ...tribe3, channels: [channel2, channel4] },
    tribe4,
  ];
};
