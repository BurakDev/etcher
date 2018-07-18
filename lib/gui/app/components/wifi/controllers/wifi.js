
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

module.exports = function (
  $uibModalInstance
) {
  /**
   * @summary Close the modal and resolve the connection
   * @function
   * @public
   *
   * @param {*} err - Modal close callback called with an error
   *
   * @returns {Boolean}
   *
   * @example
   * WifiController.closeModal();
   */
  this.closeModal = (err) => {
    if (!err) {
      $uibModalInstance.close()
      return true
    }
    return false
  }
}