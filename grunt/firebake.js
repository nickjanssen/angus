'use strict';



module.exports = function (angus) {
    return {
        options: {
            baseUrl: angus.appConfig.constants.firebaseConfig ?
                angus.appConfig.constants.firebaseConfig.url : '',
            targets: angus.appConfig.firebakeTargets,
            dest: 'apps/' + angus.appName + '/assets/firebaked.json'
        }
    };
};
