/* eslint-disable */
export const initRong = (rongInfo = {}) =>{
    (function(dependencies) {

        var global = dependencies.global;
        var RongIMLib = dependencies.RongIMLib;
        var RongIMClient = RongIMLib.RongIMClient;

        function ObserverList() {

            var checkIndexOutBound = function(index, bound) {
                return index > -1 && index < bound;
            };

            this.observerList = [];

            this.add = function(observer, force) {
                force && (this.observerList.length = 0);
                this.observerList.push(observer);
            };

            this.get = function(index) {
                if (checkIndexOutBound(index, this.observerList.length)) {
                    return this.observerList[index];
                }
            };

            this.count = function() {
                return this.observerList.length;
            };

            this.removeAt = function(index) {
                checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
            };

            this.remove = function(observer) {
                if (!observer) {
                    this.observerList.length = 0;
                    return;
                }
                observer = Object.prototype.toString.call(observer) == '[object Function]' ? [observer] : observer;
                for (var i = 0, len = this.observerList.length; i < len; i++) {
                    if (this.observerList[i] === observer[i]) {
                        this.removeAt(i);
                        break;
                    }
                }
            };

            this.notify = function(val) {
                for (var i = 0, len = this.observerList.length; i < len; i++) {
                    this.observerList[i](val);
                }
            };

            this.indexOf = function(observer, startIndex) {
                var i = startIndex || 0,
                    len = this.observerList.length;
                while (i < len) {
                    if (this.observerList[i] === observer) {
                        return i;
                    }
                    i++;
                }
                return -1;
            };
        }

        var msgObserverList = new ObserverList();

        var init = function(params, callbacks) {
            var appKey = params.appKey;
            var token = params.token;
            var navi = params.navi || '';

            if (navi !== '') {
                //?????????
                var config = {
                    navi: navi
                }
                RongIMLib.RongIMClient.init(appKey, null, config);
            } else {
                //?????????
              RongIMLib.RongIMClient.init(appKey);
            }

            var instance = RongIMClient.getInstance();

            // ?????????????????????
            RongIMClient.setConnectionStatusListener({
                onChanged: function(status) {
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                        callbacks.getInstance && callbacks.getInstance(instance);
                        break;
                    }
                }
            });

            RongIMClient.setOnReceiveMessageListener({
                // ??????????????????
                onReceived: function(message) {
                    // ??????????????????
                    msgObserverList.notify(message);
                }
            });

            //????????????
            RongIMClient.connect(token, {
                onSuccess: function(userId) {
                    callbacks.getCurrentUser && callbacks.getCurrentUser({
                        userId: userId
                    });
                    callbacks();
                    console.log('????????????:',userId);
                },
                onTokenIncorrect: function() {
                    console.log('token??????');
                },
                onError: function(errorCode) {
                    console.log(errorCode);
                }
            });
        }

        var watch = function(watcher) {
            msgObserverList.add(watcher);
        };

        global.IMLib = {
            init: init,
            watch: watch
        };
    })({
        global: window,
        RongIMLib: RongIMLib
    });
    var param = {
      appKey : rongInfo.appKey || 'cpj2xarlcs9qn',
      token : rongInfo.token || 'uQsyq0I9k7U8s0Q9ykCHTPqXxfxXe2n83O+dCCVo2f4kksQMgDyrvmMqzwh1t5eGJNkY97iIp70bqyS08MO5cw=='
    }
    IMLib.init(param,()=>{});

}
