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

import { useEffect, useState } from 'react';
import { EosioAccount, jsonRpc } from '../eosio';

export interface EosioResource {
  used: number;
  max: number;
}

export interface EosioAccountResources {
  ram: EosioResource;
  cpu: EosioResource;
  net: EosioResource;
}

export function useAccount(accountName: string) {
  const [account, setAccount] = useState<EosioAccount | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<EosioAccountResources | undefined>(undefined);

  useEffect(() => {
    let isSafeToUpdateState = true;
    setIsLoading(true);

    const setResults = (accountData: any, error: any) => {
      if (isSafeToUpdateState) {
        setAccount(accountData);
        setError(error);
      }
    };

    jsonRpc.getAccount(accountName)
      .then(accountData => setResults(accountData, undefined))
      .catch(error => setResults(undefined, error))

    return () => { isSafeToUpdateState = false; };
  }, [accountName, setAccount, setIsLoading, setError]);

  useEffect(() => {
    if (account) {
      setResources({
        ram: {
          max: account.ram_quota,
          used: account.ram_usage,
        },
        cpu: {
          max: account.cpu_limit.available,
          used: account.cpu_limit.used,
        },
        net: {
          max: account.net_limit.available,
          used: account.net_limit.used,
        },
      });
    } else {
      setResources(undefined);
    }

    setIsLoading(false);

    return () => {};
  }, [account, setResources, setIsLoading]);

  return { resources, isLoading, error };
}
