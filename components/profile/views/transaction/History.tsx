import { useEffect, useState, Fragment } from 'react';
import {
  ExternalLinkIcon
} from '@heroicons/react/outline';

// api
import { getUserTxHistory } from 'wallet/api';


// hooks
import { useAuth } from 'context/user';

enum View {
  ALL,
  ERC20,
  ERC721,
  ERC1155
}

interface TxReceipt {
  received: Array<any>,
  sent: Array<any>
}

const History = () => {
  const { me } = useAuth();
  const [view, setView] = useState<View>(View.ALL);
  const initValue = {
    received: [],
    sent: []
  }
  const [erc20, setERC20] = useState<TxReceipt>(initValue);
  const [erc721, setERC721] = useState<TxReceipt>(initValue);
  const [erc1155, setERC1155] = useState<TxReceipt>(initValue);

  useEffect(() => {
    const init = async() => {
      const {erc20, erc721, erc1155} = await getUserTxHistory(me.walletAddress);
      setERC20(erc20);
      setERC721(erc721);
      setERC1155(erc1155);
    }
    init();

    return () => {
      setERC20(initValue); setERC721(initValue); setERC1155(initValue);
    }
  }, [])

  const sortDataByDate = (data: Array<any>) => {
    let refinedData = {};
    data.map(d => {
      const date = d.metadata.blockTimestamp.split('T')[0];
      if(refinedData[date]) refinedData[date] = [...refinedData[date], d];
      else refinedData[date] = [d];
    });
    return Object.entries(refinedData).sort((a, b) => b[0].localeCompare(a[0]));
  }

  const renderView = () => {
    let data = [];
    const {received: r20, sent: s20} = erc20;
    const {received: r721, sent: s721} = erc721;
    const {received: r1155, sent: s1155} = erc1155;
    switch (view) {
      case View.ALL:
        data = sortDataByDate([...r20, ...s20, ...r721, ...s721, ...r1155, ...s1155]);
        break;
      case View.ERC20:
        data = sortDataByDate([...r20, ...s20]);
        break;
      case View.ERC721:
        data = sortDataByDate([...r721, ...s721]);
        break;
      case View.ERC1155:
        data = sortDataByDate([...r1155, ...s1155]);
        break;
    }

    return (
      <>
       {data.map(([date, value], index) => (
        <Fragment key={index}>
          <div>
            {date}
          </div>
          {value.map((v: any, i: number) => (
            <div key={i}>
              {v.from === me.walletAddress ? 'sent' : 'received'}
              {v.asset? v.asset : v.category.toUpperCase()}
              <a
                className="underline  text-sm flex flex-row items-center gap-2"
                href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${v.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                {v.hash}
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            </div>
          ))}
        </Fragment>
       ))}
      </>
    )
  };

  return (
    <>
      <div>
        <button
          className={`border-b-2 ${view === View.ALL ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.ALL)}
        >
          All
        </button>
        <button
          className={`border-b-2 ${view === View.ERC20 ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.ERC20)}
        >
          ERC20
        </button>
        <button
          className={`border-b-2 ${view === View.ERC721 ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.ERC721)}
        >
          ERC721
        </button>
        <button
          className={`border-b-2 ${view === View.ERC1155 ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.ERC1155)}
        >
          ERC1155
        </button>
      </div>
      <div className="flex flex-col rounded-xl bg-sapien-neutral-600 py-7">
        <div>{renderView()}</div>
      </div>
    </>
  );
};

export default History;
