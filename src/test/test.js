/**
 * @module  test
 * @author  lifesinger@gmail.com
 * @depends none
 */

window.KISSY = window.KISSY || {};

(function(win, S, undefined) {

    var doc = win.document,
        PASSED = 'passed',
        get = function(id) {
            return typeof id === 'string' ? doc.getElementById(id) : id;
        },
        now = function() {
            return new Date().getTime();
        },
        fix = function(val) {
            return val < 10 ? '0' + val : val;
        },
        timeStamp = function() {
            var d = new Date();
            return fix(d.getHours()) + ':' + fix(d.getMinutes()) + ':' + fix(d.getSeconds());
        },
        tests = [],
        log, hidepasses, times, wl,
        konsole = {
            init: function() {
                log = get('log');
                hidepasses = get('hidepasses').checked;
                times = get('times').value;
                wl = get('wl').value;
            },
            time: function (test) {
                test.startTime = now();
            },
            timeEnd: function (test) {
                test.tookTime = now() - test.startTime;
            },
            echo: function(msg, br) {
                if (br === undefined) br = '<br />';
                log.innerHTML += timeStamp() + '  ' + msg + br;
                log.scrollTop = log.scrollHeight;
            },
            log: function (test) {
                var msg = '';

                msg += '<span class="' + test.status + '">';
                msg += '[' + test.status.toUpperCase() + '] ';
                msg += test.name + ': ';
                msg += test.tookTime + 'ms ';
                if (test.extraMsg) msg += test.extraMsg;
                msg += '</span>';

                this.echo(msg);
            }
        };

    // Adds test case
    tests.add = function(n, func) {
        tests.push({
            name: n,
            fn: function() {
                func.call(win, this);
            },
            fail: function(msg) {
                this.status = 'failed';
                if (msg) this.extraMsg += msg;
            },
            status: PASSED,
            extraMsg: ''
        });
    };

    // Resets tests
    tests.reset = function() {
        for (var i = 0, n = tests.length; i < n; i++) {
            tests[i].status = PASSED;
            tests[i].extraMsg = '';
        }
    };

    S.Test = {

        init: function() {
            // add test cases
            var prefix = 'test_',
                global = win['RuntimeObject'] ? win['RuntimeObject'](prefix + '*') : win;
            for (var p in global) {
                if (p.indexOf('test_') === 0 && typeof win[p] === 'function') {
                    tests.add(p, win[p]);
                }
            }

            if(navigator.userAgent.indexOf('Firefox') !== -1) {
                tests.reverse();
            }
        },

        render: function() {
            var scripts = doc.getElementsByTagName('script'),
                currentScript = scripts[scripts.length - 1],
                cssUrl = currentScript.src.replace('.js', '.css'),
                tmpl =  '<link rel="stylesheet" href="' + cssUrl + '" />' +
                        '<form onsubmit="return false" action="" class="ks-test-form">' +
                           '<button type="button" onclick="KISSY.Test.start()">Start</button>' +
                           '<div id="konsole">' +
                               '<div id="log"></div>' +
                           '</div>' +
                           '<div class="settings">' +
                               'Settings:<br/>' +
                               '<input type="checkbox" id="hidepasses" name="hidepasses"/>' +
                               '<label for="hidepasses">Hide passes</label><br/>' +
                               '<input type="text" value="1" id="times" size="4"/>' +
                               '<label for="times">Iteration times for each test function</label><br/>' +
                               '<input type="text" value="" id="wl" size="12"/>' +
                               '<label for="wl">The whitelist of test names</label>' +
                           '</div>' +
                       '</form>';
            doc.body.className += ' ks-test';
            doc.write(tmpl);
        },

        start: function() {
            konsole.init();
            tests.reset();

            var len = tests.length, test, i, j;
            times = times || 1;
            wl = wl || '';

            konsole.echo('[START]');
            for (i = 0; i < len; i++) {
                test = tests[i];
                if (wl && wl.indexOf(test.name) === -1) continue;

                j = times;
                konsole.time(test);
                while (j--) test.fn();
                konsole.timeEnd(test);

                if (hidepasses && test.status === PASSED) continue;
                konsole.log(test);
            }
            konsole.echo('[DONE]', '<hr />');
        }
    };

    // Renders immmediately
    S.Test.render();

})(window, KISSY);