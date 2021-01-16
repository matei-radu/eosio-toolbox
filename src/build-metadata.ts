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

import { parseISO } from 'date-fns';

/** Metadata, injected at build time, that describes the application build. */
export const buildMetadata = {
  version: process.env.EOSIO_TOOLBOX_BUILD_VERSION ?? '0.0.0',
  buildDate: parseBuildDate(process.env.EOSIO_TOOLBOX_BUILD_DATE, new Date(0)),
  buildHash: process.env.EOSIO_TOOLBOX_BUILD_HASH ?? 'hash',
};

type ProcessEnvVar = typeof process.env[string];

function parseBuildDate(dateAsISOString: ProcessEnvVar, fallbackDate: Date): Date {
  const parsedDate = dateAsISOString ? parseISO(dateAsISOString) : fallbackDate;

  // `parseISO` can return an invalid date `new Date(NaN)` if it fails to parse.
  return !Number.isNaN(parsedDate.getTime()) ? parsedDate : fallbackDate;
}
