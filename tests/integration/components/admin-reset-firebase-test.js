import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('admin-reset-firebase', 'Integration | Component | admin reset firebase', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{admin-reset-firebase}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#admin-reset-firebase}}
      template block text
    {{/admin-reset-firebase}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
