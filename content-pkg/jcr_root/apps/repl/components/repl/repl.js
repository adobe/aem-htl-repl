use(function () {

    var JAVASCRIPT_LOGIC_FILE = 'logic.js';
    var SIGHTLY_TEMPLATE_FILE = 'template.html';
    var JAVA_TEMPLATE_FILE = 'SightlyJava_template.java';
    var slingSettings = sling.getService(Packages.org.apache.sling.settings.SlingSettingsService);
    var CLASS_ROOT_FOLDER  = '/var/classes/' + slingSettings.getSlingId() + '/sightly';

    // Recursively walks down the given path until it finds an apps folder, then returns the full path of the Java compiled template file.
    function getAppsPath(res) {
        return res.getChildren().then(function (children) {
            var length = children.length;

            // Let's see if one of the children is the apps folder.
            for (var i = 0; i < length; i++) {
                if (children[i].name === 'apps') {
                    return res.path + component.path + '/' + JAVA_TEMPLATE_FILE;
                }
            }

            // If apps wasn't found but there's only one child folder, then let's recrusively walk that one down.
            if (length === 1) {
                return getAppsPath(children[0]);
            }
        });
    }

    return {
        logicFile: JAVASCRIPT_LOGIC_FILE,
        templateFile: SIGHTLY_TEMPLATE_FILE,
        contentPath: currentPage.path + '.' + SIGHTLY_TEMPLATE_FILE,
        templatePath: component.path + '/' + SIGHTLY_TEMPLATE_FILE,
        logicPath: component.path + '/' + JAVASCRIPT_LOGIC_FILE,
        classPath: granite.resource.resolve(CLASS_ROOT_FOLDER).then(getAppsPath)
    };

});
