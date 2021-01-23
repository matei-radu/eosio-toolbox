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

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { EosioAccountResources, useAccount } from './use-account';

export function Account() {
  const accountName = useParams()['accountName'];
  const { resources, isLoading }= useAccount(accountName);

  return (
    <div>
      <h1>Account</h1>
      <Link to={'/'}>Home</Link>
      {isLoading || !resources ? <p>Loading...</p> : <AccountResources resources={resources} />}
    </div>
  );
}

export function AccountResources({ resources } : { resources: EosioAccountResources }) {
  const { ram, cpu, net } = resources;

  return (
    <div>
      <p>RAM: {ram.used}/{ram.max} ({resourceUsagePercentage(ram.used, ram.max)}%)</p>
      <p>CPU: {cpu.used}/{cpu.max} ({resourceUsagePercentage(cpu.used, cpu.max)}%)</p>
      <p>NET: {net.used}/{net.max} ({resourceUsagePercentage(net.used, net.max)}%)</p>
    </div>
  );
}

function resourceUsagePercentage(used: number, max: number): number {
  if (max === 0) {
    return 100;
  }

  return Math.floor((used / max) * 100);
}
