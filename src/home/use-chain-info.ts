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

import { useEffect, useState } from 'react'
import { EosioChainInfo, jsonRpc } from '../eosio'

interface UseAccount {
  info: EosioChainInfo | undefined;
  isLoading: boolean;
  error: any;
}

export function useChainInfo(): UseAccount {
  const [info, setInfo] = useState<EosioChainInfo | undefined>(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isSafeToUpdateState = true
    setIsLoading(true)

    const setResults = (chainInfo: EosioChainInfo | undefined, error: any) => {
      if (isSafeToUpdateState) {
        setInfo(chainInfo)
        setError(error)
        setIsLoading(false)
      }
    }

    jsonRpc.getInfo()
      .then(chainInfo => setResults(chainInfo, undefined))
      .catch(error => setResults(undefined, error))

    return () => { isSafeToUpdateState = false }
  }, [setInfo, setIsLoading, setError])

  return { info, isLoading, error }
}
