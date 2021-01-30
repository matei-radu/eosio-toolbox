/*
 * Copyright 2021 Matei Bogdan Radu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useChainInfo } from './use-chain-info'
import './home.css'

export const Home: React.FC = () => {
  const { info, isLoading, error } = useChainInfo()

  if (isLoading) {
    return (
      <HomeBaseContent>
        <Loading />
      </HomeBaseContent>
    )
  }

  if (error || !info) {
    return (
      <HomeBaseContent>
        <p>Something went wrong when retrieving chain info.</p>
      </HomeBaseContent>
    )
  }

  return (
    <HomeBaseContent>
      <ChainInfo info={info} />
    </HomeBaseContent>
  )
}

const HomeBaseContent: React.FC = ({ children }) => {
  return (
    <div className="home">
      <h1>Home</h1>
      <nav>
        <ul>
          <li><Link to={'/settings'}>Settings</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

interface ChainInfoProps {
  info: NonNullable<ReturnType<typeof useChainInfo>['info']>;
}

const ChainInfo: React.FC<ChainInfoProps> = ({ info }) => {
  const {
    chain_id,
    head_block_num,
    head_block_id,
    head_block_producer,
    head_block_time,
    last_irreversible_block_num,
    last_irreversible_block_id,
  } = info

  return (
    <div>
      <p>Chain id: {chain_id}</p>
      <p>Head block: {head_block_num} ({head_block_id})</p>
      <p>
        Head block producer:{' '}
        <Link to={`/account/${head_block_producer}`}>{head_block_producer}</Link>
      </p>
      <p>
        Head block time: {head_block_time}
      </p>
      <p>
        Last irreversible block:{' '}
        {last_irreversible_block_num} ({last_irreversible_block_id})
      </p>
    </div>
  )
}

const Loading: React.FC = () => <p>Loading...</p>
