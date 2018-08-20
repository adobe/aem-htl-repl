use(function () {
    var root = pageManager.getPage('/content/geometrixx/en');
    if (root == null) {
        root = pageManager.getPage('/content/we-retail/us/en');
    }
    return {
        navRoot: root
    };
});
