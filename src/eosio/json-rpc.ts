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

import { JsonRpc } from 'eosjs'
import { config } from './config'
import { getAccount } from './get-account'
import { getInfo } from './get-info'

/** Returns a valid `JsonRpc` instance. */
export function getJsonRpc(): JsonRpc {
  return new JsonRpc(config.nodeEndpoint, { fetch })
}

export const jsonRpc = {
  getAccount,
  getInfo,
}
