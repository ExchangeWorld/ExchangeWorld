/*! angular-deckgrid (v0.5.0) - Copyright: 2013 - 2014, André König (andre.koenig@posteo.de) - MIT */
/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

'use strict';

const gridModule = require('./deckgrid.module');

/** @ngInject */
gridModule.directive('deckgrid', initialize);

function initialize(DeckgridDescriptor) {
	return DeckgridDescriptor.create();
}
