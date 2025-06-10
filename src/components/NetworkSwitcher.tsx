import {FC} from 'react';
import dynamic from 'next/dynamic';
//internal imports
import {useNetworkConfiguration} from "../contexts/NetworkConfigurationProvider";

import NetworkSwitcherSVG from './SVG/NetworkSwitcherSVG';

const NetworkSwitcher: FC = () => {
  const { networkConfiguration,
    setNetworkConfiguration } = 
    useNetworkConfiguration();

  return <>
  <input type="checkbox" id="checkbox" />
  <label className='switch'>
    <select value={networkConfiguration}
      onChange={(e) => {
        setNetworkConfiguration(e.target.value);
      }}
      className='select max-w-xs border-none
      bg-transparent outline-0'>
      <option value="mainnet-beta">Mainnet</option>
      <option value="devnet">Devnet</option>
      <option value="testnet">Testnet</option>
    </select>
  </label>
 </>
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});