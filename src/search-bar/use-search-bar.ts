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

import { ChangeEvent, createRef, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSearchBar() {
  const [searchText, setSearchText] = useState('');

  const onSearchTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, [setSearchText]);

  const inputTextRef = createRef<HTMLInputElement>();
  const submitButtonRef = createRef<HTMLInputElement>();

  const navigate = useNavigate();
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    navigate(`/account/${searchText}`);

    inputTextRef.current?.blur();
    submitButtonRef.current?.blur();
  }, [searchText, navigate]);

  return {
    searchText,
    onSearchTextChange,
    onSubmit,
    inputTextRef,
    submitButtonRef,
  };
}
