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

import {
  createRef,
  useCallback,
  useState,
  FormHTMLAttributes,
  InputHTMLAttributes,
  RefObject,
} from 'react'
import { useNavigate } from 'react-router-dom'

interface UseSearchBar {
  searchText: string;
  onSearchTextChange: NonNullable<InputHTMLAttributes<HTMLInputElement>['onChange']>;
  onSubmit: NonNullable<FormHTMLAttributes<HTMLFormElement>['onSubmit']>;
  inputTextRef: RefObject<HTMLInputElement>;
  submitButtonRef: RefObject<HTMLInputElement>;
}

export function useSearchBar(): UseSearchBar {
  const [searchText, setSearchText] = useState('')

  const onSearchTextChange = useCallback<UseSearchBar['onSearchTextChange']>((e) => {
    setSearchText(e.target.value)
  }, [setSearchText])

  const inputTextRef = createRef<HTMLInputElement>()
  const submitButtonRef = createRef<HTMLInputElement>()

  const navigate = useNavigate()
  const onSubmit = useCallback<UseSearchBar['onSubmit']>((e) => {
    e.preventDefault()

    // The EOSIO API is case sensitive and all account names are
    // lower case, so the search text must be transformed.
    const lowerCaseSearchText = searchText.toLowerCase()

    navigate(`/account/${lowerCaseSearchText}`)

    inputTextRef.current?.blur()
    submitButtonRef.current?.blur()
  }, [searchText, navigate])

  return {
    searchText,
    onSearchTextChange,
    onSubmit,
    inputTextRef,
    submitButtonRef,
  }
}
