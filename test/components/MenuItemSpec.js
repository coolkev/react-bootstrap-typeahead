import {expect} from 'chai';
import {mount, shallow} from 'enzyme';
import {noop} from 'lodash';
import React from 'react';
import sinon from 'sinon';

import MenuItem, {BaseMenuItem} from '../../src/MenuItem';
import {childContextTypes, context} from '../helpers';

const event = {
  preventDefault: noop,
};

describe('<BaseMenuItem>', () => {
  let baseMenuItem, onClick;

  beforeEach(() => {
    onClick = sinon.spy();
    baseMenuItem = shallow(
      <BaseMenuItem onClick={onClick}>
        This is a base menu item.
      </BaseMenuItem>
    );
  });

  it('renders a base menu item', () => {
    expect(baseMenuItem).to.exist;
    expect(baseMenuItem.type()).to.equal('li');
  });

  it('renders an active base menu item', () => {
    baseMenuItem.setProps({active: true});
    expect(baseMenuItem.hasClass('active')).to.equal(true);
  });

  it('triggers an event when clicked', () => {
    baseMenuItem.find('a').simulate('click', event);
    expect(onClick.calledOnce).to.equal(true);
  });

  it('renders a disabled base menu item', () => {
    baseMenuItem.setProps({disabled: true});
    baseMenuItem.find('a').simulate('click', event);

    expect(baseMenuItem.hasClass('disabled')).to.equal(true);
    expect(onClick.notCalled).to.equal(true);
  });

});

describe('<MenuItem>', () => {
  let menuItem, onClick;

  beforeEach(() => {
    onClick = sinon.spy();
    menuItem = mount(
      <MenuItem onClick={onClick} option={{label: 'test'}} position={0}>
        This is a menu item.
      </MenuItem>,
      {childContextTypes, context}
    );
  });

  it('renders a menu item', () => {
    expect(menuItem).to.exist;
    expect(menuItem.find('a')).to.have.length(1);
  });

  it('changes the active state of the menu item', () => {
    expect(menuItem.hasClass('active')).to.equal(false);

    menuItem.setContext({activeIndex: 0});
    expect(menuItem.find('a').hasClass('active')).to.equal(true);
  });

  it('sets the active state if it is the only result', () => {
    expect(menuItem.hasClass('active')).to.equal(false);

    menuItem.setContext({isOnlyResult: true});
    expect(menuItem.find('a').hasClass('active')).to.equal(true);
  });

  it('triggers an event when clicked', () => {
    menuItem.find('a').simulate('click', event);
    expect(onClick.calledOnce).to.equal(true);
  });
});
