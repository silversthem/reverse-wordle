import React from 'react';

export type RatioData = { win: number; loss: number };
export type RatioResult = keyof RatioData;

function writeToLocalStorage(data: RatioData) {
  localStorage.setItem('win', `${data.win}`);
  localStorage.setItem('loss', `${data.loss}`);
}

export function useRatio() {
  const [data, setData] = React.useState<RatioData>({
    win: 0,
    loss: 0,
  });

  React.useEffect(() => {
    const wins = localStorage.getItem('win');
    const loses = localStorage.getItem('loss');

    setData({
      win: parseInt(wins ? wins : '0'),
      loss: parseInt(loses ? loses : '0'),
    });
  }, []);

  const addToRatio = (result: RatioResult) => {
    setData(data => {
      const newData =
        result === 'win'
          ? { win: data.win + 1, loss: data.loss }
          : { loss: data.loss + 1, win: data.win };
      writeToLocalStorage(newData);
      return newData;
    });
  };

  return {
    stats: data,
    ratio: data.win / (data.loss > 0 ? data.loss : 1),
    addToRatio,
  };
}
