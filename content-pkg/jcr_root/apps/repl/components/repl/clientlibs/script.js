/* global jQuery, ace, setTimeout, clearTimeout, console */
(function($) {
    'use strict';

    var currentState = 'source';
    var contentPath = $('#view').attr('src');

    // Limits the number of times the function gets called for event handlers
    function debounce(fn, delay) {
        var timer = null;

        return function () {
            var context = this;
            var args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    /**
     * The editor object, it will take its configuration from following attributes:
     * id: The unique identifier of the editor (will be used as key in the Editor.all map object).
     * data-src: The URL from which the editor's content has to be loaded.
     * data-mode: The ACE editor's language mode.
     * data-writeable: Boolean attribute to make the editor persisted to the data-src location.
     */
    function Editor(DOMElement, reloadOutputCallback) {
        var that = this;
        var element = $(DOMElement);
        var editor = ace.edit(DOMElement);
        var mode = element.data('mode');
        var url = element.data('src');
        var isWriteable = element.is('[data-writeable]');

        function attachSaveHandler() {
            if (isWriteable) {
                editor.session.on('change', debounce(function () {
                    that.saveChanges();
                }), 500);
            }
        }

        function init() {
            Editor.all[element.attr('id')] = that;

            editor.renderer.setShowGutter(false);
            editor.setHighlightActiveLine(false);
            editor.setShowPrintMargin(false);
            editor.setReadOnly(!isWriteable);
            editor.session.setUseWorker(false);
            editor.session.setMode(mode);
            that.loadContent(attachSaveHandler);
        }

        that.saveChanges = function (cb) {
            if (isWriteable) {
                $.ajax({
                    url: url,
                    type: 'PUT',
                    data: editor.getValue(),
                    contentType: 'plain/text',
                    success: reloadOutputCallback,
                    complete: cb
                }).fail(function (req, textStatus, message) {
                    editor.setValue(req.responseText);
                    editor.clearSelection();
                    console.error(message);
                });
            }

        };

        that.loadContent = function (cb) {
            $.ajax(url, {
                type: 'GET',
                dataType: 'text',
                cache: false,
                processData: false,
                complete: cb
            }).success(function (data) {
                editor.setValue(data);
                editor.clearSelection();
            }).fail(function (req, textStatus, message) {
                editor.setValue(req.responseText);
                editor.clearSelection();
                console.error(message);
            });
        };

        init();
    }

    // A map of all the editors, the id attribute of their parent DOM element is used as key.
    Editor.all = {};

    // Refreshes the output after changes were made
    function reloadOutput() {
        if (Editor.all[currentState] !== undefined) {
            Editor.all[currentState].loadContent();
        } else {
            // If the current state is not an editor, then it's the iFrame with the page preview
            $('#view').attr('src', contentPath);
        }
    }

    function init() {
        // Setup editors
        $('.editor').each(function () {
            new Editor(this, reloadOutput);
        });

        // Setup Use-API editing tabs
        var editors = $('.use-api');
        $('#use-api a[data-toggle=tab]').each(function () {
            var link = $(this);
            var href = link.attr('href');
            var target = editors.filter(href + '-editor');

            link.click(function () {
                editors.addClass('hidden');
                target.removeClass('hidden');
            });
        });

        // Setup output tabs
        var outputTargets = $('.output-view');
        $('#output a[data-toggle=tab]').each(function () {
            var link = $(this);
            var target = outputTargets.filter(link.attr('href'));
            var state = target.attr('id');

            link.click(function () {
                currentState = state;
                outputTargets.addClass('hidden');
                target.removeClass('hidden');
                reloadOutput();
            });
        });
    }

    init();
}(jQuery));

