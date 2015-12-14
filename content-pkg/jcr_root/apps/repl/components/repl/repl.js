use(function () {

    var JAVASCRIPT_LOGIC_FILE = 'logic.js';
    var SIGHTLY_TEMPLATE_FILE = 'template.html';

    return {
        logicFile: JAVASCRIPT_LOGIC_FILE,
        templateFile: SIGHTLY_TEMPLATE_FILE,
        contentPath: request.getContextPath() + currentPage.path + '.' + SIGHTLY_TEMPLATE_FILE,
        templatePath: request.getContextPath() + component.path + '/' + SIGHTLY_TEMPLATE_FILE,
        logicPath: request.getContextPath() + component.path + '/' + JAVASCRIPT_LOGIC_FILE
    };

});
