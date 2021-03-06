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
import { useTranslation } from 'react-i18next'
import { useSearchBar } from './use-search-bar'
import './search-bar.css'

export const SearchBar: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <SearchBarContent />
    </Suspense>
  )
}

const SearchBarContent: React.FC = () => {
  const {
    searchText,
    onSearchTextChange,
    onSubmit,
    inputTextRef,
    submitButtonRef,
  } = useSearchBar()
  const { t } = useTranslation('search-bar')

  return (
    <section className="search-bar">
      <form className="search-bar-form" onSubmit={onSubmit}>
        <label
          className="search-bar-form__label"
          htmlFor="search-bar-input-txt"
        >
          {t('label')}
        </label>
        <div className="search-bar-form__input-row">
          <input
            id="search-bar-input-txt"
            className="search-bar-form__input"
            type="text"
            ref={inputTextRef}
            value={searchText}
            onChange={onSearchTextChange}
            placeholder={t('placeholder')}
          />
          <input
            className="search-bar-form__submit"
            type="submit"
            ref={submitButtonRef}
            value={t('submit') as string}
          />
        </div>
      </form>
    </section>
  )
}
