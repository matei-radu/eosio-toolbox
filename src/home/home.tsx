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

import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useChainInfo } from './use-chain-info'
import './home.css'

export const Home: React.FC = () => {
  const { info, isLoading, error } = useChainInfo()

  if (isLoading) {
    return (
      <Suspense fallback={null}>
        <HomeBaseContent>
          <Loading />
        </HomeBaseContent>
      </Suspense>
    )
  }

  if (error || !info) {
    return (
      <Suspense fallback={null}>
        <HomeBaseContent>
          <ErrorContent />
        </HomeBaseContent>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={null}>
      <HomeBaseContent>
        <ChainInfo info={info} />
      </HomeBaseContent>
    </Suspense>
  )
}

const HomeBaseContent: React.FC = ({ children }) => {
  const { t } = useTranslation('home')

  return (
    <div className="home">
      <h1>{t('heading')}</h1>
      <nav>
        <ul>
          <li><Link to={'/settings'}>{t('navigation.settings')}</Link></li>
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

  const { t } = useTranslation('home')

  return (
    <div>
      <p>{t('home.chainInfo.chainId', { id: chain_id })}</p>
      <p>{t('home.chainInfo.headBlock', { num: head_block_num, id: head_block_id })}</p>
      <p>
        {t('home.chainInfo.headBlockProducerHeading')}
        {': '}
        <Link to={`/account/${head_block_producer}`}>{head_block_producer}</Link>
      </p>
      <p>
        Head block time: {head_block_time}
      </p>
      <p>{t('home.chainInfo.lastIrreversibleBlock', {
        num: last_irreversible_block_num,
        id: last_irreversible_block_id,
      })}</p>
    </div>
  )
}

const Loading: React.FC = () => {
  const { t } = useTranslation('home')

  return <p>{t('loading')}</p>
}

const ErrorContent: React.FC = () => {
  const { t } = useTranslation('home')

  return <p>{t('error')}</p>
}
