(function () {
  'use strict';

  angular
    .module('matches')
    .factory('matchesService', matchesService);

  matchesService.$inject = ['$http'];

  function matchesService($http) {
    /*
     * Accept or Decline a match
     * @param int userId The ID of the user to match
     * @param string definition Accepts "accept" or "decline" as value
     */
    function defineMatch(userId, definition, message) {
      var postParams = {};
      if (!angular.isUndefined(message) && message !== null) {
        postParams.push({ message: message });
      }

      return $http.post('/api/users/matches/' + userId + '/' + definition, postParams);
    }

    /*
     * Returns match by user_id
     * @param int userId ID of the user
     */
    function getMatch(userId) {
      if (angular.isUndefined(userId)) {
        return { code: 0, message: 'Must provide userId' };
      }

      return $http.get('/api/users/matches/' + userId);
    }

    /*
     * Returns a list of matches
     * @param int skip Number of matches to skip
     */
    function getMatches(skip) {
      if (angular.isUndefined(skip)) {
        skip = 0;
      }

      return $http.get('/api/users/matches/' + skip);
    }

    /*
     * Returns a list of matches,  A match is considered new if the current
     * user is invitee in this match and has not accepted or declined it
     * @param int skip Number of matches to skip
     */
    function getNewMatches(skip) {
      if (angular.isUndefined(skip)) {
        skip = 0;
      }

      return $http.get('/api/users/matches/new/' + skip);
    }

    /*
     * Completely deletes a match, reseting it
     * @param int userId ID of the matched user
     */
    function deleteMatch(userId) {
      return $http.delete('/api/users/matches/' + userId);
    }

    return {
      defineMatch: defineMatch,
      getMatch: getMatch,
      getMatches: getMatches,
      getNewMatches: getNewMatches,
      deleteMatch: deleteMatch
    };
  }
})();