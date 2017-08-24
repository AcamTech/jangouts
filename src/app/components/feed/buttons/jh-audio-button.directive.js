/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

(function () {
  'use strict';

  angular.module('janusHangouts')
    .directive('jhAudioButton', jhAudioButton);

  jhAudioButton.$inject = ['RoomService', 'MuteNotifier'];

  function jhAudioButton(RoomService, MuteNotifier) {
    return {
      restrict: 'EA',
      templateUrl: 'app/components/feed/buttons/jh-audio-button.html',
      scope: {
        feed: '=',
        withMonitor: '=',
        thumbnailIcon: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: JhAudioButtonCtrl
    };

    function JhAudioButtonCtrl() {
      /* jshint: validthis */
      var vm = this;

      vm.toggle = toggle;
      vm.showsEnable = showsEnable;
      vm.showsDisable = showsDisable;
      vm.showsAudioOff = showsAudioOff;
      vm.isSpeaking = isSpeaking;
      vm.isThumbnailIcon = isThumbnailIcon;

      function toggle() {
        var feed = vm.feed;

        RoomService.toggleChannel("audio", feed);
        if (feed.isPublisher && !feed.isLocalScreen && !feed.getAudioEnabled()) {
          MuteNotifier.dismissLastNotification();
        }
      }

      function showsEnable() {
        var feed = vm.feed;
        return (feed && feed.isPublisher && !feed.isLocalScreen && !feed.getAudioEnabled());
      }

      function showsDisable() {
        var feed = vm.feed;
        return (feed && !feed.isIgnored && feed.getAudioEnabled());
      }

      function showsAudioOff() {
        var feed = vm.feed;
        return (feed && !feed.isPublisher && !feed.isIgnored && !feed.getAudioEnabled());
      }

      function isSpeaking() {
        return (vm.withMonitor && vm.feed && vm.feed.getSpeaking());
      }

      function isThumbnailIcon() {
        return vm.thumbnailIcon;
      }
    }
  }
})();
