// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { clear as kvClear, get as kvGet, getMany, set as kvSet, setMany, createStore } from 'idb-keyval'

const edgeStore = createStore('edge', 'wallet')

const clear = async () => {
  await kvClear(edgeStore)
}

const get = async key => {
  let returnValue

  if (Array.isArray(key)) {
    returnValue = await getMany(key, edgeStore)
  } else {
    returnValue = await kvGet(key, edgeStore)
  }

  return returnValue
}

const set = async (key, value) => {
  await kvSet(key, value, edgeStore)
}

export {
  clear,
  get,
  set
}
