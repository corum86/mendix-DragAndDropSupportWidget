/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */
/*
    DraggableWidget
    ========================

    @file      : DraggableWidget.js
    @version   : 1.0
    @author    : Marcel Groeneweg
    @date      : 20-02-2017
    @copyright : ITvisors
    @license   : Apache 2

    Documentation
    ========================
    Draggable widget
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
require([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase',
    'mxui/dom',
    'DragAndDropSupportWidget/lib/jquery.ui.touch-punch'
], function (declare, _WidgetBase, dom, $) {
    'use strict';

    // Declare widget's prototype.
    return declare('DragAndDropSupportWidget.widget.DraggableWidget', [ _WidgetBase ], {

        // Parameters configured in the Modeler.

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
//            console.log(this.id + '.postCreate');

//            this.domNode.appendChild(dom.create('span', { 'class': 'DraggableWidget-message' }, this.messageString));

            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
//            console.log(this.id + '.update');

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            var args = {};
            if (this.dragContainment) {
                args.containment = this.dragContainment;
            }
            args.revert = "invalid";
            if (this.makeClone) {
                args.helper = "clone";
            }
            $(this.domNode.parentElement).addClass(this.draggableClass).draggable(args);
        },

        _updateRendering: function () {
            $(this.domNode.parentElement).attr({
                "data-object-type" : this._contextObj.getEntity(),
                "data-object-guid" : this._contextObj.getGuid()
            });
        },

        _resetSubscriptions: function () {
            // Release handle on previous object, if any.
            if (this._handle) {
                this.unsubscribe(this._handle);
                this._handle = null;
            }

            if (this._contextObj) {
                this._handle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: this._updateRendering
                });
            }
        }
    });
});
