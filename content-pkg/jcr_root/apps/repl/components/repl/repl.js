use(function () {

    var CLASS_ROOT_FOLDER  = '/var/classes/sightly';
    var COMPONENT_PATH     = '/apps/repl/components/repl';
    var JAVA_TEMPLATE_FILE = 'SightlyJava_template.java';

    // Recursively walks down the given path until it finds an apps folder, then returns the full path of the Java compiled template file.
    function getAppsPath(res) {
        return res.getChildren().then(function (children) {
            var length = children.length;

            // Let's see if one of the children is the apps folder.
            for (var i = 0; i < length; i++) {
                if (children[i].name === 'apps') {
                    return res.path + COMPONENT_PATH + '/' + JAVA_TEMPLATE_FILE;
                }
            }

            // If apps wasn't found but there's only one child folder, then let's recrusively walk that one down.
            if (length === 1) {
                return getAppsPath(children[0]);
            }
        });
    }

    return {
        classPath: granite.resource.resolve(CLASS_ROOT_FOLDER).then(getAppsPath)
    };

});