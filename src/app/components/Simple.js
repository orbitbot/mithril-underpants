var Simple = {
  controller: function() {},
  view: function(ctrl) {
    return m('div.wrapper', [
      m('span', 'This is a span'),
      m('#id', 'This div has an id'),
      m('.class', 'This div has a class'),
      m('div', 'content')
    ]);
  }
};