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

import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

const config: InitOptions = {
  resources,

  debug: true,

  defaultNS: 'global',

  lng: 'en-US',
  // If no translation string is available, use 'en-US'.
  fallbackLng: 'en-US',

  interpolation: {
    // React already safes from xss.
    escapeValue: false,
  },
}

let localizationInitialized = false

export async function initLocalization(): Promise<void> {
  if (!localizationInitialized) {
    await i18n.use(initReactI18next).init(config)
    localizationInitialized = true
  }
}
