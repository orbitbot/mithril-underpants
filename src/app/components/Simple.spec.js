var mq = require('mithril-query');

describe('Simple Component', function() {

  it('has a controller', function() {
    assert.isFunction(Simple.controller, 'Simple.controller should be a function');
  });

  it('compiles a view', function() {
    assert.isFunction(Simple.view, 'Simple.controller should be a function');
    var widget = Simple.view(Simple.controller());
    var $widget = mq(widget);

    assert($widget.has('span'), 'should create span node');
    assert($widget.has('div > span'), 'should create span node');
    assert($widget.has('#id'), 'should create fooId node');
    assert($widget.has('.class'), 'should create barClass node');
    assert($widget.has(':contains(content)'), 'should create node with content');
    assert($widget.contains('content'), 'should create node with content');
  });
});

