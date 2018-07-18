/*
 * Copyright 2018 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const _ = require('lodash')

const wifiServiceIP = process.env.ETCHER_WIFI_SERVICE_IP || 'localhost'
const wifiServicePORT = process.env.ETCHER_WIFI_SERVICE_PORT || '1337'

const wifiServiceEndpoint = `http://${wifiServiceIP}:${wifiServicePORT}/wifi`

module.exports = {
  isActive: () => {
    const method = 'get-wifi-active'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.json().then((err) => {
          throw err
        })
      })
      .then((res) => {
        return res.active
      })
      .catch((err) => {
        if (!err.message) {
          err.message = 'Couldn\'t get Wireless Device status'
        }
        if (err.message === 'Failed to fetch') {
          err.message = 'NetworkManager service timed out'
        }
        throw err
      })
  },

  toggleWifi: (value) => {
    const method = 'toggle-wifi'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res.json().then((err) => {
          throw err
        })
      })
      .then((res) => {
        return res.value
      })
  },

  getNetworks: () => {
    const method = 'list-nearby-networks'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res.json().then((err) => {
          throw err
        })
      })
      .then((networks) => {
        const formattedNetworks = _.map(networks, (network) => {
          const newNetwork = _.reduce(network, (acc, val, key) => {
            if (key === 'security') {
              acc.security = val.open ? 'open' : 'closed'
            } else {
              acc[_.toLower(key)] = val
            }
            return acc
          }, {})
          return newNetwork
        })
        return formattedNetworks
      })
  },

  getCurrentNetwork: () => {
    const method = 'current-network'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.text()
        }
        throw res.json().then((err) => {
          throw err
        })
      })
      .then((network) => {
        if (_.isEmpty(network)) {
          return {}
        }
        return { ssid: JSON.parse(network) }
      })
  },

  connect: (value) => {
    const method = 'connect-network'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res.json().then((err) => {
          throw err
        })
      })
      .then((success) => {
        return success
      })
  },

  forget: (value) => {
    const method = 'forget-network'
    const api = `${wifiServiceEndpoint}/${method}`
    return fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res.json().then((err) => {
          throw err
        })
      })
      .then((success) => {
        return success
      })
  }
}