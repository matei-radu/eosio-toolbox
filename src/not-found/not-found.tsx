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
import './not-found.css'

export const NotFound: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  )
}

const NotFoundContent: React.FC = () => {
  const { t } = useTranslation('not-found')

  return (
    <div className="not-found">
      <h1>{t('heading')}</h1>
      <Link to={'/'}>{t('navigation.home')}</Link>
    </div>
  )
}
