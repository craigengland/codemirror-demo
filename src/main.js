import CodeMirror from 'codemirror';
import { variables } from './constants/variables';
import 'codemirror/mode/php/php';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/show-hint';

import 'ace-builds';
import 'ace-builds/webpack-resolver';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { CodeJar } from 'codejar';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Prism from 'prismjs';
import { withLineNumbers } from 'codejar/linenumbers';

import './main.css';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Codemirror
   */
  const textarea = document.querySelector('.code');
  const select = document.querySelector('#theme');
  let theme = 'default';
  const editor = CodeMirror(
    function (el) {
      textarea.parentNode.replaceChild(el, textarea);
    },
    {
      lineNumbers: true,
      mode: 'php',
      value: textarea.innerHTML,
      theme: theme,
      tabSize: 2,
      autoCloseBrackets: true,
      matchBrackets: true,
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
    }
  );

  editor.getDoc().setValue(`<?php $config['macanta_verson'] = '%tag%'; ?>`);

  const btn = document.querySelector('.get-code');
  const submit = document.querySelector('.submit');
  btn.addEventListener('click', (e) => {
    const value = editor.getValue();
    submit.textContent = value;
  });

  editor.on('keyHandled', function (instance, name, e) {
    if (name == 'Ctrl-Space') {
      var options = {
        hint: function () {
          return {
            from: editor.getDoc().getCursor(),
            to: editor.getDoc().getCursor(),
            list: variables,
          };
        },
      };
      editor.showHint(options);
    }
  });

  select.addEventListener('change', (e) => {
    theme = e.target.value;
    editor.setOption('theme', theme);
  });

  /**
   * Ace
   */

  const aceSelect = document.querySelector('#ace-theme');
  aceSelect.addEventListener('change', (e) => {
    const aceTheme = e.target.value;
    aceEditor.setTheme(`ace/theme/${aceTheme}`);
  });

  const aceEditor = ace.edit('editor', {
    mode: 'ace/mode/powershell',
    theme: 'ace/theme/github',
    maxLines: 50,
    minLines: 5,
    fontSize: 14,
  });

  /**
   * Monaco
   */

  const container = document.getElementById('container');
  const code = `
  (function (global, undefined) {
    "use strict";
    undefinedVariable = {};
    undefinedVariable.prop = 5;
    function initializeProperties(target, members) {
      var keys = Object.keys(members);
      var properties;
      var i, len;
      for (i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var enumerable = key.charCodeAt(0) !== /*_*/95;
        var member = members[key];
        if (member && typeof member === 'object') {
          if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
            if (member.enumerable === undefined) {
              member.enumerable = enumerable;
            }
            properties = properties || {};
            properties[key] = member;
            continue;
          }
        }
        if (!enumerable) {
          properties = properties || {};
          properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
          continue;
        }
        target[key] = member;
      }
      if (properties) {
        Object.defineProperties(target, properties);
      }
    }
    (function (rootNamespace) {
      // Create the rootNamespace in the global namespace
      if (!global[rootNamespace]) {
        global[rootNamespace] = Object.create(Object.prototype);
      }
      // Cache the rootNamespace we just created in a local variable
      var _rootNamespace = global[rootNamespace];
      if (!_rootNamespace.Namespace) {
        _rootNamespace.Namespace = Object.create(Object.prototype);
      }
      function defineWithParent(parentNamespace, name, members) {
        /// <summary locid="1">
        /// Defines a new namespace with the specified name, under the specified parent namespace.
        /// </summary>
        /// <param name="parentNamespace" type="Object" locid="2">
        /// The parent namespace which will contain the new namespace.
        /// </param>
        /// <param name="name" type="String" locid="3">
        /// Name of the new namespace.
        /// </param>
        /// <param name="members" type="Object" locid="4">
        /// Members in the new namespace.
        /// </param>
        /// <returns locid="5">
        /// The newly defined namespace.
        /// </returns>
        var currentNamespace = parentNamespace,
          namespaceFragments = name.split(".");
        for (var i = 0, len = namespaceFragments.length; i < len; i++) {
          var namespaceName = namespaceFragments[i];
          if (!currentNamespace[namespaceName]) {
            Object.defineProperty(currentNamespace, namespaceName,
              { value: {}, writable: false, enumerable: true, configurable: true }
            );
          }
          currentNamespace = currentNamespace[namespaceName];
        }
        if (members) {
          initializeProperties(currentNamespace, members);
        }
        return currentNamespace;
      }
      function define(name, members) {
        /// <summary locid="6">
        /// Defines a new namespace with the specified name.
        /// </summary>
        /// <param name="name" type="String" locid="7">
        /// Name of the namespace.  This could be a dot-separated nested name.
        /// </param>
        /// <param name="members" type="Object" locid="4">
        /// Members in the new namespace.
        /// </param>
        /// <returns locid="5">
        /// The newly defined namespace.
        /// </returns>
        return defineWithParent(global, name, members);
      }
      // Establish members of the "WinJS.Namespace" namespace
      Object.defineProperties(_rootNamespace.Namespace, {
        defineWithParent: { value: defineWithParent, writable: true, enumerable: true },
        define: { value: define, writable: true, enumerable: true }
      });
    })("WinJS");
    (function (WinJS) {
      function define(constructor, instanceMembers, staticMembers) {
        /// <summary locid="8">
        /// Defines a class using the given constructor and with the specified instance members.
        /// </summary>
        /// <param name="constructor" type="Function" locid="9">
        /// A constructor function that will be used to instantiate this class.
        /// </param>
        /// <param name="instanceMembers" type="Object" locid="10">
        /// The set of instance fields, properties and methods to be made available on the class.
        /// </param>
        /// <param name="staticMembers" type="Object" locid="11">
        /// The set of static fields, properties and methods to be made available on the class.
        /// </param>
        /// <returns type="Function" locid="12">
        /// The newly defined class.
        /// </returns>
        constructor = constructor || function () { };
        if (instanceMembers) {
          initializeProperties(constructor.prototype, instanceMembers);
        }
        if (staticMembers) {
          initializeProperties(constructor, staticMembers);
        }
        return constructor;
      }
      function derive(baseClass, constructor, instanceMembers, staticMembers) {
        /// <summary locid="13">
        /// Uses prototypal inheritance to create a sub-class based on the supplied baseClass parameter.
        /// </summary>
        /// <param name="baseClass" type="Function" locid="14">
        /// The class to inherit from.
        /// </param>
        /// <param name="constructor" type="Function" locid="9">
        /// A constructor function that will be used to instantiate this class.
        /// </param>
        /// <param name="instanceMembers" type="Object" locid="10">
        /// The set of instance fields, properties and methods to be made available on the class.
        /// </param>
        /// <param name="staticMembers" type="Object" locid="11">
        /// The set of static fields, properties and methods to be made available on the class.
        /// </param>
        /// <returns type="Function" locid="12">
        /// The newly defined class.
        /// </returns>
        if (baseClass) {
          constructor = constructor || function () { };
          var basePrototype = baseClass.prototype;
          constructor.prototype = Object.create(basePrototype);
          Object.defineProperty(constructor.prototype, "_super", { value: basePrototype });
          Object.defineProperty(constructor.prototype, "constructor", { value: constructor });
          if (instanceMembers) {
            initializeProperties(constructor.prototype, instanceMembers);
          }
          if (staticMembers) {
            initializeProperties(constructor, staticMembers);
          }
          return constructor;
        } else {
          return define(constructor, instanceMembers, staticMembers);
        }
      }
      function mix(constructor) {
        /// <summary locid="15">
        /// Defines a class using the given constructor and the union of the set of instance members
        /// specified by all the mixin objects.  The mixin parameter list can be of variable length.
        /// </summary>
        /// <param name="constructor" locid="9">
        /// A constructor function that will be used to instantiate this class.
        /// </param>
        /// <returns locid="12">
        /// The newly defined class.
        /// </returns>
        constructor = constructor || function () { };
        var i, len;
        for (i = 0, len = arguments.length; i < len; i++) {
          initializeProperties(constructor.prototype, arguments[i]);
        }
        return constructor;
      }
      // Establish members of "WinJS.Class" namespace
      WinJS.Namespace.define("WinJS.Class", {
        define: define,
        derive: derive,
        mix: mix
      });
    })(WinJS);
  })(this);
  `;
  const m = monaco.editor.create(container, {
    value: code,
    language: 'javascript',
    theme: 'vs',
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  });
  const monacoSelect = document.querySelector('#monaco-theme');
  monacoSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    monaco.editor.setTheme(selected);
  });

  /**
   * Codejar
   */

  hljs.registerLanguage('javascript', javascript);
  const highlight = (editor) => {
    // highlight.js does not trims old tags,
    // let's do it by this hack.
    editor.textContent = editor.textContent;
    Prism.highlightElement(editor);
  };

  let editorCode = document.querySelector('.editor');

  let jar = CodeJar(editorCode, withLineNumbers(highlight), { tab: '  ' });
  jar.updateCode(`let foo = bar; \nfunction() {\n  something();\n}`);
});

// #= require CodeMirror.js
// #= require CodeMirror-clike.js
// #= require CodeMirror-xml.js
// #= require CodeMirror-htmlmixed.js
// #= require CodeMirror-mode.js
// #= require CodeMirror-hint.js
