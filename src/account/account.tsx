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

import React, { CSSProperties, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EosioAccountResources, EosioResource, useAccount } from './use-account'
import './account.css'

export const Account: React.FC = () => {
  const accountName = useParams()['accountName']
  const { resources, isLoading, error }= useAccount(accountName)

  if (isLoading) {
    return (
      <Suspense fallback={null}>
        <AccountBaseContent>
          <Loading />
        </AccountBaseContent>
      </Suspense>
    )
  }

  if (error || !resources) {
    return (
      <Suspense fallback={null}>
        <AccountBaseContent>
          <ErrorContent accountName={accountName} />
        </AccountBaseContent>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={null}>
      <AccountBaseContent>
        <AccountResources resources={resources} />
      </AccountBaseContent>
    </Suspense>
  )
}

const AccountBaseContent: React.FC = ({ children }) => {
  const { t } = useTranslation('account')

  return (
    <div className="account">
      <h1>{t('heading')}</h1>
      <Link to={'/'}>{t('navigation.home')}</Link>
      {children}
    </div>
  )
}

const Loading: React.FC = () => {
  const { t } = useTranslation('account')

  return <p>{t('loading')}</p>
}

const ErrorContent: React.FC<{ accountName: string }> = ({ accountName }) => {
  const { t } = useTranslation('account')

  return <p>{t('error',{ name: accountName })}</p>
}

const AccountResources: React.FC<{ resources: EosioAccountResources }> = ({ resources }) => {
  const { ram, cpu, net } = resources
  const { t } = useTranslation('account')

  return (
    <section className="account-resources">
      <h2>{t('resources.heading')}</h2>
      <div className="resource-row-container">
        <ResourceRow res={ram} resName={t('resources.ram')} />
        <ResourceRow res={cpu} resName={t('resources.cpu')} />
        <ResourceRow res={net} resName={t('resources.net')} />
      </div>
    </section>
  )
}

const ResourceRow: React.FC<{ res: EosioResource; resName: string }> = ({ res, resName }) => {
  return (
    <div className="resource-row">
      <span className="resource-row__text">
        <span>{resName} - {res.used} / {res.max}</span>
        <span>{resourceUsagePercentage(res.used, res.max)}%</span>
      </span>
      <ResourceBar res={res} />
    </div>
  )
}

const ResourceBar: React.FC<{ res: EosioResource }> = ({ res }) => {
  const percentage = resourceUsagePercentage(res.used, res.max)
  const fillStyle: CSSProperties = { width: `${percentage}%` }

  return (
    <div className="resource-bar">
      <span className="resource-bar__fill" style={fillStyle} />
    </div>
  )
}

function resourceUsagePercentage(used: number, max: number): number {
  if (max === 0) {
    return 100
  }

  return Math.floor((used / max) * 100)
}
