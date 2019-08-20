/*
    @author    : Marcel Groeneweg
    @copyright : ITvisors
    @license   : Apache 2
*/

require([
    "dojo/_base/declare", "mxui/widget/_WidgetBase",
    "DragAndDropSupportWidget/lib/jquery.ui.touch-punch"
], function (declare, _WidgetBase, $) {
    "use strict";

    return declare("DragAndDropSupportWidget.widget.DraggableWidget", [ _WidgetBase ], {
        // Modeler parameters
        draggableClass: "",
        dragContainment: "",
        makeClone: true,
        delay: 0,

        // Internal variables
        _contextObject: null,

        postCreate: function () {
            this._setupEvents();
        },

        update: function (object, callback) {
            this._contextObject = object;
            this._setDataAttributes();
            if (callback) {
                callback();
            }
        },

        _setupEvents: function () {
            // http://api.jqueryui.com/draggable/
            const parentElem = $(this.domNode.parentElement);
            const options = {
                containment: this.dragContainment || false,
                revert: "invalid",
                helper: this.makeClone ? "clone" : "original",
                disabled: true
            };
            parentElem
                .addClass('draggable ' + this.draggableClass)
                .draggable(options);
            let timeout;
            setTimeout(() => {
                parentElem.draggable('disable');
            }, 0);

            parentElem.on('touchstart', (event) => {
                if (parentElem.hasClass('dragged')) {
                    return;
                }
                parentElem.addClass('drag-start');
                timeout = setTimeout(function () {
                    parentElem.draggable('enable').addClass('dragged');
                    parentElem.trigger(event);
                }, this.delay);
            }).on('touchmove', () => {
                if (!parentElem.hasClass('dragged')) {
                    clearTimeout(timeout);
                    parentElem.removeClass('drag-start');
                }
            }).on('touchend', () => {
                clearTimeout(timeout);
                parentElem.removeClass('dragged').removeClass('drag-start').draggable('disable');
            });

            /*parentElem.on('mousedown', (event) => {
                if (parentElem.hasClass('dragged')) {
                    return;
                }
                parentElem.addClass('drag-start');
                timeout = setTimeout(function () {
                    parentElem.draggable('enable').addClass('dragged');
                    parentElem.trigger(event);
                }, 0);
            }).on('mousemove', () => {
                if (!parentElem.hasClass('dragged')) {
                    clearTimeout(timeout);
                    parentElem.removeClass('drag-start');
                }
            }).on('mouseup', () => {
                clearTimeout(timeout);
                parentElem.removeClass('dragged').removeClass('drag-start').draggable('disable');
            });*/
        },

        _setDataAttributes: function () {
            var type = this._contextObject && this._contextObject.getEntity() || "";
            var guid = this._contextObject && this._contextObject.getGuid() || "";

            $(this.domNode.parentElement).attr({
                "data-object-type" : type,
                "data-object-guid" : guid
            });
            if ($(this.domNode.parentElement).data('ui-draggable')) {
                $(this.domNode.parentElement).draggable(this._contextObject ? "enable" : "disable");
            }
        }

    });
});
