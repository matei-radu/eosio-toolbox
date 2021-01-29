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

import { getJsonRpc } from './json-rpc'

type EosioAccountName = string
type DateISOString = string
type EosioAssetString = string

export interface EosioResourceLimit {
  used: number;
  available: number;
  max: number;
}

export interface EosioRequiredAuth {
  threshold: number;
  keys: Array<{ key: string; weight: number; }>;
  accounts: any[];
  waits: any[];
}

export interface EosioPermission {
  perm_name: string;
  parent: string;
  required_auth: EosioRequiredAuth[];
}

export interface EosioAccount {
  account_name: EosioAccountName;
  head_block_num: number;
  head_block_time: string;
  privileged: boolean;
  last_code_update: DateISOString;
  created: DateISOString;
  core_liquid_balance: EosioAssetString;
  ram_quota: number;
  net_weight: number;
  cpu_weight: number;
  net_limit: EosioResourceLimit;
  cpu_limit: EosioResourceLimit;
  ram_usage: number;
  permissions: EosioPermission[];
  total_resources: any;
  self_delegated_bandwidth: any;
  refund_request: any;
  voter_info: any;
  rex_info: any;
}

/**
 * Wrapper around `JsonRpc.get_account` with typed return. Functionality is unchanged.
 */
export function getAccount(accountName: string): Promise<EosioAccount> {
  return getJsonRpc().get_account(accountName)
}
