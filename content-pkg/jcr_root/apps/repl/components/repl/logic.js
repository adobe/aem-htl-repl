use(['/apps/q.js'], function(Q) {
    
    var props = [];
    for (var prop in this) {
        props.push(prop);
    }
    
    return {
        message: props,
        param1: this.param1
    };
    
});
