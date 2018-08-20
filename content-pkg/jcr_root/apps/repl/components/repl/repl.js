use(function () {

    var SIGHTLY_TEMPLATE_FILE = 'template.html';

    return {
        templateFile: SIGHTLY_TEMPLATE_FILE,
        contentPath: request.getContextPath() + currentPage.path + '.' + SIGHTLY_TEMPLATE_FILE,
        templatePath: request.getContextPath() + component.path + '/' + SIGHTLY_TEMPLATE_FILE
    };

});
