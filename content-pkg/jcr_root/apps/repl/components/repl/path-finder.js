use(function() {

    var CLASS_ROOT_FOLDER = '/var/classes/sightly'

    function getFirstChild(res) {
        return res.getChildren().then(function(cs) {
            return cs[0];
        });
    }

    return granite.resource.resolve(CLASS_ROOT_FOLDER)
        .then(getFirstChild)
        .then(getFirstChild)
        .get('path');
});