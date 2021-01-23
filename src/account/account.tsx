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

import React, { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EosioAccountResources, EosioResource, useAccount } from './use-account';
import './account.css';

export function Account() {
  const accountName = useParams()['accountName'];
  const { resources, isLoading }= useAccount(accountName);

  return (
    <div className="account">
      <h1>Account</h1>
      <Link to={'/'}>Home</Link>
      {isLoading || !resources ? <p>Loading...</p> : <AccountResources resources={resources} />}
    </div>
  );
}

export function AccountResources({ resources } : { resources: EosioAccountResources }) {
  const { ram, cpu, net } = resources;

  return (
    <section className="account-resources">
      <h2>Resources</h2>
      <div className="resource-row-container">
        <ResourceRow res={ram} resName={'RAM'} />
        <ResourceRow res={cpu} resName={'CPU'} />
        <ResourceRow res={net} resName={'NET'} />
      </div>
    </section>
  );
}

function ResourceRow({ res, resName }: { res: EosioResource, resName: string }) {
  return (
    <div className="resource-row">
      <span className="resource-row__text">
        <span>{resName} - {res.used} / {res.max}</span>
        <span>{resourceUsagePercentage(res.used, res.max)}%</span>
      </span>
      <ResourceBar res={res} />
    </div>
  );
}

function ResourceBar({ res }: { res: EosioResource }) {
  const percentage = resourceUsagePercentage(res.used, res.max);
  const fillStyle: CSSProperties = { width: `${percentage}%` };

  return (
    <div className="resource-bar">
      <span className="resource-bar__fill" style={fillStyle} />
    </div>
  );
}

function resourceUsagePercentage(used: number, max: number): number {
  if (max === 0) {
    return 100;
  }

  return Math.floor((used / max) * 100);
}
