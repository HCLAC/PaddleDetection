(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/positionContent/positionContent"],{

/***/ 233:
/*!********************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/main.js?{"page":"pages%2FpositionContent%2FpositionContent"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _positionContent = _interopRequireDefault(__webpack_require__(/*! ./pages/positionContent/positionContent.vue */ 234));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_positionContent.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 234:
/*!*************************************************************************!*\
  !*** D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positionContent.vue?vue&type=template&id=9877cbf4& */ 235);
/* harmony import */ var _positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positionContent.vue?vue&type=script&lang=js& */ 237);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positionContent.vue?vue&type=style&index=0&lang=scss& */ 239);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/fengyan-mp/pages/positionContent/positionContent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 235:
/*!********************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=template&id=9877cbf4& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./positionContent.vue?vue&type=template&id=9877cbf4& */ 236);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_template_id_9877cbf4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 236:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=template&id=9877cbf4& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "uni-nav-bar": function() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @/components/uni-nav-bar/uni-nav-bar.vue */ 63))
  },
  "uni-icons": function() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 78))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 237:
/*!**************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./positionContent.vue?vue&type=script&lang=js& */ 238);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 238:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


























































































































var _uniNavBar = _interopRequireDefault(__webpack_require__(/*! @/components/uni-nav-bar/uni-nav-bar.vue */ 63));
var _uniIcons = _interopRequireDefault(__webpack_require__(/*! @/components/uni-icons/uni-icons.vue */ 78));
var _uniFav = _interopRequireDefault(__webpack_require__(/*! @/components/uni-fav/uni-fav.vue */ 86));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _this;var _default = { comments: { uniNavBar: _uniNavBar.default, uniIcons: _uniIcons.default, uniFav: _uniFav.default }, data: function data() {return { indicatorDots: true, current: 0, list: [{ key: '1', title: 'A' }, { key: '2', title: 'B' }, { key: '3', title: 'C' }, { key: '4', title: 'D' }, { key: '6', title: 'E' }, { key: '7', title: 'F' }], likemessage: 144, favmessage: 219, isShow: true };}, created: function created() {_this = this, _this.getOrder();}, methods: { change: function change(e) {_this.current = e.detail.current;}, getOrder: function getOrder() {_this.swiperlength, _this.list = [{ key: '1', title: 'A' }, { key: '2', title: 'B' }, { key: '3', title: 'C' }, { key: '4', title: 'D' }, { key: '6', title: 'E' }, { key: '7', title: 'F' }];}, back: function back() {uni.navigateBack({ delta: 1 });}, home: function home() {uni.switchTab({ url: '/pages/index/index' });}, likeclick: function likeclick() {// console.log("cccccccccccc")
      this.likemessage++;}, favclick: function favclick() {// console.log("cccccccccccc")
      this.favmessage++;}, showMore: function showMore() {this.isShow = !this.isShow;} // favClick() {
    // 	this.checked = !this.checked
    //  this.$forceUpdate()
    // }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 239:
/*!***********************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./positionContent.vue?vue&type=style&index=0&lang=scss& */ 240);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_positionContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 240:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/pages/positionContent/positionContent.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 63:
/*!**********************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-nav-bar.vue?vue&type=template&id=18288480&scoped=true& */ 64);
/* harmony import */ var _uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-nav-bar.vue?vue&type=script&lang=js& */ 66);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-nav-bar.vue?vue&type=style&index=0&id=18288480&scoped=true&lang=css& */ 68);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "18288480",
  null,
  false,
  _uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 64:
/*!*****************************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=template&id=18288480&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-nav-bar.vue?vue&type=template&id=18288480&scoped=true& */ 65);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_template_id_18288480_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 65:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=template&id=18288480&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "uni-status-bar": function() {
    return __webpack_require__.e(/*! import() | components/uni-status-bar/uni-status-bar */ "components/uni-status-bar/uni-status-bar").then(__webpack_require__.bind(null, /*! @/components/uni-status-bar/uni-status-bar.vue */ 165))
  },
  "uni-icons": function() {
    return Promise.all(/*! import() | components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 78))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 66:
/*!***********************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-nav-bar.vue?vue&type=script&lang=js& */ 67);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 67:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var uniStatusBar = function uniStatusBar() {__webpack_require__.e(/*! require.ensure | components/uni-status-bar/uni-status-bar */ "components/uni-status-bar/uni-status-bar").then((function () {return resolve(__webpack_require__(/*! ../uni-status-bar/uni-status-bar.vue */ 165));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniIcons = function uniIcons() {Promise.all(/*! require.ensure | components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-icons/uni-icons")]).then((function () {return resolve(__webpack_require__(/*! ../uni-icons/uni-icons.vue */ 78));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};











































/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * NavBar 自定义导航栏
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @description 导航栏组件，主要用于头部导航
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @tutorial https://ext.dcloud.net.cn/plugin?id=52
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} title 标题文字
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} leftText 左侧按钮文本
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} rightText 右侧按钮文本
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} leftIcon 左侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} rightIcon 右侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} color 图标和文字颜色
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {String} backgroundColor 导航栏背景颜色
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {Boolean} fixed = [true|false] 是否固定顶部
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {Boolean} statusBar = [true|false] 是否包含状态栏
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @property {Boolean} shadow = [true|false] 导航栏下是否有阴影
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @event {Function} clickLeft 左侧按钮点击时触发
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @event {Function} clickRight 右侧按钮点击时触发
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */var _default =
{
  name: "UniNavBar",
  components: {
    uniStatusBar: uniStatusBar,
    uniIcons: uniIcons },

  props: {
    title: {
      type: String,
      default: "" },

    leftText: {
      type: String,
      default: "" },

    rightText: {
      type: String,
      default: "" },

    leftIcon: {
      type: String,
      default: "" },

    rightIcon: {
      type: String,
      default: "" },

    fixed: {
      type: [Boolean, String],
      default: true },

    color: {
      type: String,
      default: "#000000" },

    backgroundColor: {
      type: String,
      default: "#FFFFFF" },

    statusBar: {
      type: [Boolean, String],
      default: false },

    shadow: {
      type: [Boolean, String],
      default: false },

    border: {
      type: [Boolean, String],
      default: true } },


  mounted: function mounted() {
    if (uni.report && this.title !== '') {
      uni.report('title', this.title);
    }
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit("clickLeft");
    },
    onClickRight: function onClickRight() {
      this.$emit("clickRight");
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 68:
/*!*******************************************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=style&index=0&id=18288480&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-nav-bar.vue?vue&type=style&index=0&id=18288480&scoped=true&lang=css& */ 69);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_nav_bar_vue_vue_type_style_index_0_id_18288480_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 69:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-nav-bar/uni-nav-bar.vue?vue&type=style&index=0&id=18288480&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 78:
/*!******************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-icons.vue?vue&type=template&id=1c19abe2&scoped=true& */ 79);
/* harmony import */ var _uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-icons.vue?vue&type=script&lang=js& */ 81);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-icons.vue?vue&type=style&index=0&id=1c19abe2&scoped=true&lang=css& */ 84);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1c19abe2",
  null,
  false,
  _uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/fengyan-mp/components/uni-icons/uni-icons.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 79:
/*!*************************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=template&id=1c19abe2&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-icons.vue?vue&type=template&id=1c19abe2&scoped=true& */ 80);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_template_id_1c19abe2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 80:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=template&id=1c19abe2&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 81:
/*!*******************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-icons.vue?vue&type=script&lang=js& */ 82);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 82:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




var _icons = _interopRequireDefault(__webpack_require__(/*! ./icons.js */ 83));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//





/**
 * Icons 图标
 * @description 用于展示 icons 图标
 * @tutorial https://ext.dcloud.net.cn/plugin?id=28
 * @property {Number} size 图标大小
 * @property {String} type 图标图案，参考示例
 * @property {String} color 图标颜色
 * @event {Function} click 点击 Icon 触发事件
 */var _default =
{
  name: 'UniIcons',
  props: {
    type: {
      type: String,
      default: '' },

    color: {
      type: String,
      default: '#333333' },

    size: {
      type: [Number, String],
      default: 16 } },


  data: function data() {
    return {
      icons: _icons.default };

  },
  methods: {
    _onClick: function _onClick() {
      this.$emit('click');
    } } };exports.default = _default;

/***/ }),

/***/ 84:
/*!***************************************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=style&index=0&id=1c19abe2&scoped=true&lang=css& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-icons.vue?vue&type=style&index=0&id=1c19abe2&scoped=true&lang=css& */ 85);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_icons_vue_vue_type_style_index_0_id_1c19abe2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 85:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-icons/uni-icons.vue?vue&type=style&index=0&id=1c19abe2&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 86:
/*!**************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-fav.vue?vue&type=template&id=fc2c0338&scoped=true& */ 87);
/* harmony import */ var _uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-fav.vue?vue&type=script&lang=js& */ 89);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-fav.vue?vue&type=style&index=0&id=fc2c0338&scoped=true&lang=css& */ 91);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "fc2c0338",
  null,
  false,
  _uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/fengyan-mp/components/uni-fav/uni-fav.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 87:
/*!*********************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=template&id=fc2c0338&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fav.vue?vue&type=template&id=fc2c0338&scoped=true& */ 88);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_template_id_fc2c0338_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 88:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=template&id=fc2c0338&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "uni-icons": function() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 78))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 89:
/*!***************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fav.vue?vue&type=script&lang=js& */ 90);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 90:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var uniIcons = function uniIcons() {Promise.resolve(/*! require.ensure */).then((function () {return resolve(__webpack_require__(/*! ../uni-icons/uni-icons.vue */ 78));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};
















/**
                                                                                                                                                                                                                                                                       * Fav 收藏按钮
                                                                                                                                                                                                                                                                       * @description 用于收藏功能，可点击切换选中、不选中的状态
                                                                                                                                                                                                                                                                       * @tutorial https://ext.dcloud.net.cn/plugin?id=864
                                                                                                                                                                                                                                                                       * @property {Boolean} star = [true|false] 按钮是否带星星
                                                                                                                                                                                                                                                                       * @property {String} bgColor 未收藏时的背景色
                                                                                                                                                                                                                                                                       * @property {String} bgColorChecked 已收藏时的背景色
                                                                                                                                                                                                                                                                       * @property {String} fgColor 未收藏时的文字颜色
                                                                                                                                                                                                                                                                       * @property {String} fgColorChecked 已收藏时的文字颜色
                                                                                                                                                                                                                                                                       * @property {Boolean} circle = [true|false] 是否为圆角
                                                                                                                                                                                                                                                                       * @property {Boolean} checked = [true|false] 是否为已收藏
                                                                                                                                                                                                                                                                       * @property {Object} contentText = [true|false] 收藏按钮文字
                                                                                                                                                                                                                                                                       * @event {Function} click 点击 fav按钮触发事件
                                                                                                                                                                                                                                                                       * @example <uni-fav :checked="true"/>
                                                                                                                                                                                                                                                                       */var _default2 =
{
  name: "UniFav",
  components: {
    uniIcons: uniIcons },

  props: {
    star: {
      type: [Boolean, String],
      default: true },

    bgColor: {
      type: String,
      default: "#eeeeee" },

    fgColor: {
      type: String,
      default: "#666666" },

    bgColorChecked: {
      type: String,
      default: "#007aff" },

    fgColorChecked: {
      type: String,
      default: "#FFFFFF" },

    circle: {
      type: [Boolean, String],
      default: false },

    checked: {
      type: Boolean,
      default: false },

    contentText: {
      type: Object,
      default: function _default() {
        return {
          contentDefault: "收藏",
          contentFav: "已收藏" };

      } } },


  watch: {
    checked: function checked() {
      if (uni.report) {
        if (this.checked) {
          uni.report("收藏", "收藏");
        } else {
          uni.report("取消收藏", "取消收藏");
        }
      }
    } },

  methods: {
    onClick: function onClick() {
      this.$emit("click");
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 91:
/*!***********************************************************************************************************************!*\
  !*** D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=style&index=0&id=fc2c0338&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fav.vue?vue&type=style&index=0&id=fc2c0338&scoped=true&lang=css& */ 92);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_fav_vue_vue_type_style_index_0_id_fc2c0338_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 92:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/fengyan-mp/components/uni-fav/uni-fav.vue?vue&type=style&index=0&id=fc2c0338&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWU/MzMxMyIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWU/M2U5OCIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWU/OTAxYSIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWU/MWQzYiIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWUiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL3BhZ2VzL3Bvc2l0aW9uQ29udGVudC9wb3NpdGlvbkNvbnRlbnQudnVlP2E1ZmUiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL3BhZ2VzL3Bvc2l0aW9uQ29udGVudC9wb3NpdGlvbkNvbnRlbnQudnVlPzJmOTEiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlP2Y1YjMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlPzk3YzYiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlPzU3NTYiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlPzAzMzMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1uYXYtYmFyL3VuaS1uYXYtYmFyLnZ1ZT9kNDkzIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1uYXYtYmFyL3VuaS1uYXYtYmFyLnZ1ZT84OTUwIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnMudnVlPzM5ZWEiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLWljb25zL3VuaS1pY29ucy52dWU/NWU2OSIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktaWNvbnMvdW5pLWljb25zLnZ1ZT8yMWUzIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnMudnVlPzFhMTkiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLWljb25zL3VuaS1pY29ucy52dWUiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLWljb25zL3VuaS1pY29ucy52dWU/NzQ3NSIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktaWNvbnMvdW5pLWljb25zLnZ1ZT81M2M0Iiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1mYXYvdW5pLWZhdi52dWU/Zjc2NCIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktZmF2L3VuaS1mYXYudnVlPzNlOWUiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLWZhdi91bmktZmF2LnZ1ZT9hNGI3Iiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1mYXYvdW5pLWZhdi52dWU/Yjk3ZiIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktZmF2L3VuaS1mYXYudnVlIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1mYXYvdW5pLWZhdi52dWU/NDBiMyIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktZmF2L3VuaS1mYXYudnVlP2Q4ZDEiXSwibmFtZXMiOlsiY3JlYXRlUGFnZSIsIlBhZ2UiLCJfdGhpcyIsImNvbW1lbnRzIiwidW5pTmF2QmFyIiwidW5pSWNvbnMiLCJ1bmlGYXYiLCJkYXRhIiwiaW5kaWNhdG9yRG90cyIsImN1cnJlbnQiLCJsaXN0Iiwia2V5IiwidGl0bGUiLCJsaWtlbWVzc2FnZSIsImZhdm1lc3NhZ2UiLCJpc1Nob3ciLCJjcmVhdGVkIiwiZ2V0T3JkZXIiLCJtZXRob2RzIiwiY2hhbmdlIiwiZSIsImRldGFpbCIsInN3aXBlcmxlbmd0aCIsImJhY2siLCJ1bmkiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImhvbWUiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJsaWtlY2xpY2siLCJmYXZjbGljayIsInNob3dNb3JlIiwibmFtZSIsImNvbXBvbmVudHMiLCJ1bmlTdGF0dXNCYXIiLCJwcm9wcyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwibGVmdFRleHQiLCJyaWdodFRleHQiLCJsZWZ0SWNvbiIsInJpZ2h0SWNvbiIsImZpeGVkIiwiQm9vbGVhbiIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdHVzQmFyIiwic2hhZG93IiwiYm9yZGVyIiwibW91bnRlZCIsInJlcG9ydCIsIm9uQ2xpY2tMZWZ0IiwiJGVtaXQiLCJvbkNsaWNrUmlnaHQiLCJzaXplIiwiTnVtYmVyIiwiaWNvbnMiLCJfb25DbGljayIsInN0YXIiLCJiZ0NvbG9yIiwiZmdDb2xvciIsImJnQ29sb3JDaGVja2VkIiwiZmdDb2xvckNoZWNrZWQiLCJjaXJjbGUiLCJjaGVja2VkIiwiY29udGVudFRleHQiLCJPYmplY3QiLCJjb250ZW50RGVmYXVsdCIsImNvbnRlbnRGYXYiLCJ3YXRjaCIsIm9uQ2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0RBQUEsd0NBQW1CO0FBQ25CO0FBQ0EsMkg7QUFDQUEsVUFBVSxDQUFDQyx3QkFBRCxDQUFWLEM7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEg7QUFDNUg7QUFDbUU7QUFDTDtBQUNjOzs7QUFHNUU7QUFDMk47QUFDM04sZ0JBQWdCLGtPQUFVO0FBQzFCLEVBQUUscUZBQU07QUFDUixFQUFFLDBGQUFNO0FBQ1IsRUFBRSxtR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSw4RkFBVTtBQUNaO0FBQ0E7O0FBRUE7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdkJmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQSxXQUFXLHlIQUVOO0FBQ0wsR0FBRztBQUNIO0FBQ0EsV0FBVyxxSEFFTjtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFvNEIsQ0FBZ0IsazRCQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMkh4NUI7QUFDQTtBQUNBLHNHLDhGQTdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlDLEtBQUosQyxlQUllLEVBQ2RDLFFBQVEsRUFBRSxFQUNUQyxTQUFTLEVBQVRBLGtCQURTLEVBRVRDLFFBQVEsRUFBUkEsaUJBRlMsRUFHVEMsTUFBTSxFQUFOQSxlQUhTLEVBREksRUFNZEMsSUFOYyxrQkFNUCxDQUNOLE9BQU8sRUFDTkMsYUFBYSxFQUFFLElBRFQsRUFFTkMsT0FBTyxFQUFFLENBRkgsRUFHTkMsSUFBSSxFQUFFLENBQUMsRUFBRUMsR0FBRyxFQUFFLEdBQVAsRUFBWUMsS0FBSyxFQUFFLEdBQW5CLEVBQUQsRUFBMkIsRUFBRUQsR0FBRyxFQUFFLEdBQVAsRUFBWUMsS0FBSyxFQUFFLEdBQW5CLEVBQTNCLEVBQXFELEVBQUVELEdBQUcsRUFBRSxHQUFQLEVBQVlDLEtBQUssRUFBRSxHQUFuQixFQUFyRCxFQUErRSxFQUFFRCxHQUFHLEVBQUUsR0FBUCxFQUFZQyxLQUFLLEVBQUUsR0FBbkIsRUFBL0UsRUFBeUcsRUFBRUQsR0FBRyxFQUFFLEdBQVAsRUFBWUMsS0FBSyxFQUFFLEdBQW5CLEVBQXpHLEVBQW1JLEVBQUVELEdBQUcsRUFBRSxHQUFQLEVBQVlDLEtBQUssRUFBRSxHQUFuQixFQUFuSSxDQUhBLEVBSU5DLFdBQVcsRUFBRSxHQUpQLEVBS05DLFVBQVUsRUFBRSxHQUxOLEVBTU5DLE1BQU0sRUFBRSxJQU5GLEVBQVAsQ0FRQSxDQWZhLEVBZ0JkQyxPQWhCYyxxQkFnQkosQ0FDUmQsS0FBSyxHQUFHLElBQVQsRUFBZ0JBLEtBQUssQ0FBQ2UsUUFBTixFQUFoQixDQUNBLENBbEJhLEVBb0JkQyxPQUFPLEVBQUUsRUFDUkMsTUFEUSxrQkFDREMsQ0FEQyxFQUNFLENBQ1RsQixLQUFLLENBQUNPLE9BQU4sR0FBZ0JXLENBQUMsQ0FBQ0MsTUFBRixDQUFTWixPQUF6QixDQUNBLENBSE8sRUFJUlEsUUFKUSxzQkFJRyxDQUNWZixLQUFLLENBQUNvQixZQUFOLEVBQ0VwQixLQUFLLENBQUNRLElBQU4sR0FBYSxDQUNiLEVBQUVDLEdBQUcsRUFBRSxHQUFQLEVBQVlDLEtBQUssRUFBRSxHQUFuQixFQURhLEVBRWIsRUFBRUQsR0FBRyxFQUFFLEdBQVAsRUFBWUMsS0FBSyxFQUFFLEdBQW5CLEVBRmEsRUFHYixFQUFFRCxHQUFHLEVBQUUsR0FBUCxFQUFZQyxLQUFLLEVBQUUsR0FBbkIsRUFIYSxFQUliLEVBQUVELEdBQUcsRUFBRSxHQUFQLEVBQVlDLEtBQUssRUFBRSxHQUFuQixFQUphLEVBS2IsRUFBRUQsR0FBRyxFQUFFLEdBQVAsRUFBWUMsS0FBSyxFQUFFLEdBQW5CLEVBTGEsRUFNYixFQUFFRCxHQUFHLEVBQUUsR0FBUCxFQUFZQyxLQUFLLEVBQUUsR0FBbkIsRUFOYSxDQURmLENBU0EsQ0FkTyxFQWVSVyxJQWZRLGtCQWVELENBQ05DLEdBQUcsQ0FBQ0MsWUFBSixDQUFpQixFQUNoQkMsS0FBSyxFQUFFLENBRFMsRUFBakIsRUFHQSxDQW5CTyxFQW9CUkMsSUFwQlEsa0JBb0JELENBQ05ILEdBQUcsQ0FBQ0ksU0FBSixDQUFjLEVBQ2JDLEdBQUcsRUFBRSxvQkFEUSxFQUFkLEVBR0EsQ0F4Qk8sRUF5QlJDLFNBekJRLHVCQXlCSSxDQUNYO0FBQ0EsV0FBS2pCLFdBQUwsR0FDQSxDQTVCTyxFQTZCUmtCLFFBN0JRLHNCQTZCRyxDQUNWO0FBQ0EsV0FBS2pCLFVBQUwsR0FDQSxDQWhDTyxFQWlDUmtCLFFBakNRLHNCQWlDRyxDQUNWLEtBQUtqQixNQUFMLEdBQWMsQ0FBQyxLQUFLQSxNQUFwQixDQUNBLENBbkNPLENBb0NSO0FBQ0E7QUFDQTtBQUNBO0FBdkNRLEdBcEJLLEU7Ozs7Ozs7Ozs7Ozs7QUM5SGY7QUFBQTtBQUFBO0FBQUE7QUFBeW1ELENBQWdCLGdpREFBRyxFQUFDLEM7Ozs7Ozs7Ozs7O0FDQTduRDtBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkOzs7Ozs7Ozs7Ozs7O0FDTkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9JO0FBQ3BJO0FBQytEO0FBQ0w7QUFDcUM7OztBQUcvRjtBQUMyTjtBQUMzTixnQkFBZ0Isa09BQVU7QUFDMUIsRUFBRSxpRkFBTTtBQUNSLEVBQUUsa0dBQU07QUFDUixFQUFFLDJHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNHQUFVO0FBQ1o7QUFDQTs7QUFFQTtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN2QmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLFdBQVcsNE5BRU47QUFDTCxHQUFHO0FBQ0g7QUFDQSxXQUFXLG1QQUVOO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUFBO0FBQWc0QixDQUFnQiw4M0JBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzRDcDVCOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCZTtBQUNka0IsTUFBSSxFQUFFLFdBRFE7QUFFZEMsWUFBVSxFQUFFO0FBQ1hDLGdCQUFZLEVBQVpBLFlBRFc7QUFFWDlCLFlBQVEsRUFBUkEsUUFGVyxFQUZFOztBQU1kK0IsT0FBSyxFQUFFO0FBQ054QixTQUFLLEVBQUU7QUFDTnlCLFVBQUksRUFBRUMsTUFEQTtBQUVOQyxhQUFPLEVBQUUsRUFGSCxFQUREOztBQUtOQyxZQUFRLEVBQUU7QUFDVEgsVUFBSSxFQUFFQyxNQURHO0FBRVRDLGFBQU8sRUFBRSxFQUZBLEVBTEo7O0FBU05FLGFBQVMsRUFBRTtBQUNWSixVQUFJLEVBQUVDLE1BREk7QUFFVkMsYUFBTyxFQUFFLEVBRkMsRUFUTDs7QUFhTkcsWUFBUSxFQUFFO0FBQ1RMLFVBQUksRUFBRUMsTUFERztBQUVUQyxhQUFPLEVBQUUsRUFGQSxFQWJKOztBQWlCTkksYUFBUyxFQUFFO0FBQ1ZOLFVBQUksRUFBRUMsTUFESTtBQUVWQyxhQUFPLEVBQUUsRUFGQyxFQWpCTDs7QUFxQk5LLFNBQUssRUFBRTtBQUNOUCxVQUFJLEVBQUUsQ0FBQ1EsT0FBRCxFQUFVUCxNQUFWLENBREE7QUFFTkMsYUFBTyxFQUFFLElBRkgsRUFyQkQ7O0FBeUJOTyxTQUFLLEVBQUU7QUFDTlQsVUFBSSxFQUFFQyxNQURBO0FBRU5DLGFBQU8sRUFBRSxTQUZILEVBekJEOztBQTZCTlEsbUJBQWUsRUFBRTtBQUNoQlYsVUFBSSxFQUFFQyxNQURVO0FBRWhCQyxhQUFPLEVBQUUsU0FGTyxFQTdCWDs7QUFpQ05TLGFBQVMsRUFBRTtBQUNWWCxVQUFJLEVBQUUsQ0FBQ1EsT0FBRCxFQUFVUCxNQUFWLENBREk7QUFFVkMsYUFBTyxFQUFFLEtBRkMsRUFqQ0w7O0FBcUNOVSxVQUFNLEVBQUU7QUFDUFosVUFBSSxFQUFFLENBQUNRLE9BQUQsRUFBVVAsTUFBVixDQURDO0FBRVBDLGFBQU8sRUFBRSxLQUZGLEVBckNGOztBQXlDTlcsVUFBTSxFQUFFO0FBQ1BiLFVBQUksRUFBRSxDQUFDUSxPQUFELEVBQVVQLE1BQVYsQ0FEQztBQUVQQyxhQUFPLEVBQUUsSUFGRixFQXpDRixFQU5POzs7QUFvRGRZLFNBcERjLHFCQW9ESjtBQUNULFFBQUkzQixHQUFHLENBQUM0QixNQUFKLElBQWMsS0FBS3hDLEtBQUwsS0FBZSxFQUFqQyxFQUFxQztBQUNwQ1ksU0FBRyxDQUFDNEIsTUFBSixDQUFXLE9BQVgsRUFBb0IsS0FBS3hDLEtBQXpCO0FBQ0E7QUFDRCxHQXhEYTtBQXlEZE0sU0FBTyxFQUFFO0FBQ1JtQyxlQURRLHlCQUNNO0FBQ2IsV0FBS0MsS0FBTCxDQUFXLFdBQVg7QUFDQSxLQUhPO0FBSVJDLGdCQUpRLDBCQUlPO0FBQ2QsV0FBS0QsS0FBTCxDQUFXLFlBQVg7QUFDQSxLQU5PLEVBekRLLEU7Ozs7Ozs7Ozs7Ozs7QUM3RGY7QUFBQTtBQUFBO0FBQUE7QUFBMnhDLENBQWdCLHF2Q0FBRyxFQUFDLEM7Ozs7Ozs7Ozs7O0FDQS95QztBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkOzs7Ozs7Ozs7Ozs7O0FDTkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtJO0FBQ2xJO0FBQzZEO0FBQ0w7QUFDcUM7OztBQUc3RjtBQUMyTjtBQUMzTixnQkFBZ0Isa09BQVU7QUFDMUIsRUFBRSwrRUFBTTtBQUNSLEVBQUUsZ0dBQU07QUFDUixFQUFFLHlHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9HQUFVO0FBQ1o7QUFDQTs7QUFFQTtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN2QmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQTgzQixDQUFnQiw0M0JBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0tsNUIsK0UsOEZBTEE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFTZTtBQUNkckIsTUFBSSxFQUFFLFVBRFE7QUFFZEcsT0FBSyxFQUFFO0FBQ05DLFFBQUksRUFBRTtBQUNMQSxVQUFJLEVBQUVDLE1BREQ7QUFFTEMsYUFBTyxFQUFFLEVBRkosRUFEQTs7QUFLTk8sU0FBSyxFQUFFO0FBQ05ULFVBQUksRUFBRUMsTUFEQTtBQUVOQyxhQUFPLEVBQUUsU0FGSCxFQUxEOztBQVNOaUIsUUFBSSxFQUFFO0FBQ0xuQixVQUFJLEVBQUUsQ0FBQ29CLE1BQUQsRUFBU25CLE1BQVQsQ0FERDtBQUVMQyxhQUFPLEVBQUUsRUFGSixFQVRBLEVBRk87OztBQWdCZGhDLE1BaEJjLGtCQWdCUDtBQUNOLFdBQU87QUFDTm1ELFdBQUssRUFBRUEsY0FERCxFQUFQOztBQUdBLEdBcEJhO0FBcUJkeEMsU0FBTyxFQUFFO0FBQ1J5QyxZQURRLHNCQUNHO0FBQ1YsV0FBS0wsS0FBTCxDQUFXLE9BQVg7QUFDQSxLQUhPLEVBckJLLEU7Ozs7Ozs7Ozs7OztBQ3ZCZjtBQUFBO0FBQUE7QUFBQTtBQUF5eEMsQ0FBZ0IsbXZDQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7QUNBN3lDO0FBQ0EsT0FBTyxLQUFVLEVBQUUsa0JBS2Q7Ozs7Ozs7Ozs7Ozs7QUNOTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0k7QUFDaEk7QUFDMkQ7QUFDTDtBQUNxQzs7O0FBRzNGO0FBQzJOO0FBQzNOLGdCQUFnQixrT0FBVTtBQUMxQixFQUFFLDZFQUFNO0FBQ1IsRUFBRSw4RkFBTTtBQUNSLEVBQUUsdUdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsa0dBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3ZCZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsV0FBVyxxSEFFTjtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBQTtBQUFBO0FBQTQzQixDQUFnQiwwM0JBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2lCaDVCOzs7Ozs7Ozs7Ozs7Ozs7QUFlZTtBQUNkckIsTUFBSSxFQUFFLFFBRFE7QUFFZEMsWUFBVSxFQUFFO0FBQ1g3QixZQUFRLEVBQVJBLFFBRFcsRUFGRTs7QUFLZCtCLE9BQUssRUFBRTtBQUNOd0IsUUFBSSxFQUFFO0FBQ0x2QixVQUFJLEVBQUUsQ0FBQ1EsT0FBRCxFQUFVUCxNQUFWLENBREQ7QUFFTEMsYUFBTyxFQUFFLElBRkosRUFEQTs7QUFLTnNCLFdBQU8sRUFBRTtBQUNSeEIsVUFBSSxFQUFFQyxNQURFO0FBRVJDLGFBQU8sRUFBRSxTQUZELEVBTEg7O0FBU051QixXQUFPLEVBQUU7QUFDUnpCLFVBQUksRUFBRUMsTUFERTtBQUVSQyxhQUFPLEVBQUUsU0FGRCxFQVRIOztBQWFOd0Isa0JBQWMsRUFBRTtBQUNmMUIsVUFBSSxFQUFFQyxNQURTO0FBRWZDLGFBQU8sRUFBRSxTQUZNLEVBYlY7O0FBaUJOeUIsa0JBQWMsRUFBRTtBQUNmM0IsVUFBSSxFQUFFQyxNQURTO0FBRWZDLGFBQU8sRUFBRSxTQUZNLEVBakJWOztBQXFCTjBCLFVBQU0sRUFBRTtBQUNQNUIsVUFBSSxFQUFFLENBQUNRLE9BQUQsRUFBVVAsTUFBVixDQURDO0FBRVBDLGFBQU8sRUFBRSxLQUZGLEVBckJGOztBQXlCTjJCLFdBQU8sRUFBRTtBQUNSN0IsVUFBSSxFQUFFUSxPQURFO0FBRVJOLGFBQU8sRUFBRSxLQUZELEVBekJIOztBQTZCTjRCLGVBQVcsRUFBRTtBQUNaOUIsVUFBSSxFQUFFK0IsTUFETTtBQUVaN0IsYUFGWSxzQkFFRDtBQUNWLGVBQU87QUFDTjhCLHdCQUFjLEVBQUUsSUFEVjtBQUVOQyxvQkFBVSxFQUFFLEtBRk4sRUFBUDs7QUFJQSxPQVBXLEVBN0JQLEVBTE87OztBQTRDZEMsT0FBSyxFQUFFO0FBQ05MLFdBRE0scUJBQ0k7QUFDVCxVQUFJMUMsR0FBRyxDQUFDNEIsTUFBUixFQUFnQjtBQUNmLFlBQUksS0FBS2MsT0FBVCxFQUFrQjtBQUNqQjFDLGFBQUcsQ0FBQzRCLE1BQUosQ0FBVyxJQUFYLEVBQWlCLElBQWpCO0FBQ0EsU0FGRCxNQUVPO0FBQ041QixhQUFHLENBQUM0QixNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQjtBQUNBO0FBQ0Q7QUFDRCxLQVRLLEVBNUNPOztBQXVEZGxDLFNBQU8sRUFBRTtBQUNSc0QsV0FEUSxxQkFDRTtBQUNULFdBQUtsQixLQUFMLENBQVcsT0FBWDtBQUNBLEtBSE8sRUF2REssRTs7Ozs7Ozs7Ozs7OztBQ2hDZjtBQUFBO0FBQUE7QUFBQTtBQUF1eEMsQ0FBZ0IsaXZDQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7QUNBM3lDO0FBQ0EsT0FBTyxLQUFVLEVBQUUsa0JBS2QiLCJmaWxlIjoicGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndW5pLXBhZ2VzJztpbXBvcnQgJ0BkY2xvdWRpby91bmktc3RhdCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBQYWdlIGZyb20gJy4vcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWUnXG5jcmVhdGVQYWdlKFBhZ2UpIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9wb3NpdGlvbkNvbnRlbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTk4NzdjYmY0JlwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vcG9zaXRpb25Db250ZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vcG9zaXRpb25Db250ZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9wb3NpdGlvbkNvbnRlbnQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwid29yay90ZXN0L2Zlbmd5YW4tbXAvcGFnZXMvcG9zaXRpb25Db250ZW50L3Bvc2l0aW9uQ29udGVudC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTE2LTAhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi90ZW1wbGF0ZS5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci9wYWdlLW1ldGEuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3Bvc2l0aW9uQ29udGVudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9OTg3N2NiZjQmXCIiLCJ2YXIgY29tcG9uZW50cyA9IHtcbiAgXCJ1bmktbmF2LWJhclwiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW1wb3J0KFxuICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb21wb25lbnRzL3VuaS1uYXYtYmFyL3VuaS1uYXYtYmFyXCIgKi8gXCJAL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlXCJcbiAgICApXG4gIH0sXG4gIFwidW5pLWljb25zXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpbXBvcnQoXG4gICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImNvbXBvbmVudHMvdW5pLWljb25zL3VuaS1pY29uc1wiICovIFwiQC9jb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnMudnVlXCJcbiAgICApXG4gIH1cbn1cbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3Bvc2l0aW9uQ29udGVudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3Bvc2l0aW9uQ29udGVudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCIvL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuXG52YXIgX3RoaXM7XG5pbXBvcnQgdW5pTmF2QmFyIGZyb20gJ0AvY29tcG9uZW50cy91bmktbmF2LWJhci91bmktbmF2LWJhci52dWUnO1xuaW1wb3J0IHVuaUljb25zIGZyb20gJ0AvY29tcG9uZW50cy91bmktaWNvbnMvdW5pLWljb25zLnZ1ZSc7XG5pbXBvcnQgdW5pRmF2IGZyb20gJ0AvY29tcG9uZW50cy91bmktZmF2L3VuaS1mYXYudnVlJztcbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29tbWVudHM6IHtcblx0XHR1bmlOYXZCYXIsXG5cdFx0dW5pSWNvbnMsXG5cdFx0dW5pRmF2XG5cdH0sXG5cdGRhdGEoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluZGljYXRvckRvdHM6IHRydWUsXG5cdFx0XHRjdXJyZW50OiAwLFxuXHRcdFx0bGlzdDogW3sga2V5OiAnMScsIHRpdGxlOiAnQScgfSwgeyBrZXk6ICcyJywgdGl0bGU6ICdCJyB9LCB7IGtleTogJzMnLCB0aXRsZTogJ0MnIH0sIHsga2V5OiAnNCcsIHRpdGxlOiAnRCcgfSwgeyBrZXk6ICc2JywgdGl0bGU6ICdFJyB9LCB7IGtleTogJzcnLCB0aXRsZTogJ0YnIH1dLFxuXHRcdFx0bGlrZW1lc3NhZ2U6IDE0NCxcblx0XHRcdGZhdm1lc3NhZ2U6IDIxOSxcblx0XHRcdGlzU2hvdzogdHJ1ZVxuXHRcdH07XG5cdH0sXG5cdGNyZWF0ZWQoKSB7XG5cdFx0KF90aGlzID0gdGhpcyksIF90aGlzLmdldE9yZGVyKCk7XG5cdH0sXG5cblx0bWV0aG9kczoge1xuXHRcdGNoYW5nZShlKSB7XG5cdFx0XHRfdGhpcy5jdXJyZW50ID0gZS5kZXRhaWwuY3VycmVudDtcblx0XHR9LFxuXHRcdGdldE9yZGVyKCkge1xuXHRcdFx0X3RoaXMuc3dpcGVybGVuZ3RoLFxuXHRcdFx0XHQoX3RoaXMubGlzdCA9IFtcblx0XHRcdFx0XHR7IGtleTogJzEnLCB0aXRsZTogJ0EnIH0sXG5cdFx0XHRcdFx0eyBrZXk6ICcyJywgdGl0bGU6ICdCJyB9LFxuXHRcdFx0XHRcdHsga2V5OiAnMycsIHRpdGxlOiAnQycgfSxcblx0XHRcdFx0XHR7IGtleTogJzQnLCB0aXRsZTogJ0QnIH0sXG5cdFx0XHRcdFx0eyBrZXk6ICc2JywgdGl0bGU6ICdFJyB9LFxuXHRcdFx0XHRcdHsga2V5OiAnNycsIHRpdGxlOiAnRicgfVxuXHRcdFx0XHRdKTtcblx0XHR9LFxuXHRcdGJhY2soKSB7XG5cdFx0XHR1bmkubmF2aWdhdGVCYWNrKHtcblx0XHRcdFx0ZGVsdGE6IDFcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0aG9tZSgpIHtcblx0XHRcdHVuaS5zd2l0Y2hUYWIoe1xuXHRcdFx0XHR1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGxpa2VjbGljaygpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiY2NjY2NjY2NjY2NjXCIpXG5cdFx0XHR0aGlzLmxpa2VtZXNzYWdlKys7XG5cdFx0fSxcblx0XHRmYXZjbGljaygpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiY2NjY2NjY2NjY2NjXCIpXG5cdFx0XHR0aGlzLmZhdm1lc3NhZ2UrKztcblx0XHR9LFxuXHRcdHNob3dNb3JlKCkge1xuXHRcdFx0dGhpcy5pc1Nob3cgPSAhdGhpcy5pc1Nob3c7XG5cdFx0fVxuXHRcdC8vIGZhdkNsaWNrKCkge1xuXHRcdC8vIFx0dGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZFxuXHRcdC8vICB0aGlzLiRmb3JjZVVwZGF0ZSgpXG5cdFx0Ly8gfVxuXHR9XG59O1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTgtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LW9uZU9mLTEtNCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTEtNSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vcG9zaXRpb25Db250ZW50LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTgtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LW9uZU9mLTEtNCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTEtNSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vcG9zaXRpb25Db250ZW50LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1OTU2NzM1MzI1MDFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vdW5pLW5hdi1iYXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE4Mjg4NDgwJnNjb3BlZD10cnVlJlwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vdW5pLW5hdi1iYXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi91bmktbmF2LWJhci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vdW5pLW5hdi1iYXIudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MTgyODg0ODAmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjE4Mjg4NDgwXCIsXG4gIG51bGwsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIndvcmsvdGVzdC9mZW5neWFuLW1wL2NvbXBvbmVudHMvdW5pLW5hdi1iYXIvdW5pLW5hdi1iYXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xNi0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvdGVtcGxhdGUuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvcGFnZS1tZXRhLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktbmF2LWJhci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTgyODg0ODAmc2NvcGVkPXRydWUmXCIiLCJ2YXIgY29tcG9uZW50cyA9IHtcbiAgXCJ1bmktc3RhdHVzLWJhclwiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW1wb3J0KFxuICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb21wb25lbnRzL3VuaS1zdGF0dXMtYmFyL3VuaS1zdGF0dXMtYmFyXCIgKi8gXCJAL2NvbXBvbmVudHMvdW5pLXN0YXR1cy1iYXIvdW5pLXN0YXR1cy1iYXIudnVlXCJcbiAgICApXG4gIH0sXG4gIFwidW5pLWljb25zXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpbXBvcnQoXG4gICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImNvbXBvbmVudHMvdW5pLWljb25zL3VuaS1pY29uc1wiICovIFwiQC9jb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnMudnVlXCJcbiAgICApXG4gIH1cbn1cbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1uYXYtYmFyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTItMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3NjcmlwdC5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vdW5pLW5hdi1iYXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cblxuaW1wb3J0IHVuaVN0YXR1c0JhciBmcm9tIFwiLi4vdW5pLXN0YXR1cy1iYXIvdW5pLXN0YXR1cy1iYXIudnVlXCI7XG5pbXBvcnQgdW5pSWNvbnMgZnJvbSBcIi4uL3VuaS1pY29ucy91bmktaWNvbnMudnVlXCI7XG5cbi8qKlxuICogTmF2QmFyIOiHquWumuS5ieWvvOiIquagj1xuICogQGRlc2NyaXB0aW9uIOWvvOiIquagj+e7hOS7tu+8jOS4u+imgeeUqOS6juWktOmDqOWvvOiIqlxuICogQHR1dG9yaWFsIGh0dHBzOi8vZXh0LmRjbG91ZC5uZXQuY24vcGx1Z2luP2lkPTUyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gdGl0bGUg5qCH6aKY5paH5a2XXG4gKiBAcHJvcGVydHkge1N0cmluZ30gbGVmdFRleHQg5bem5L6n5oyJ6ZKu5paH5pysXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmlnaHRUZXh0IOWPs+S+p+aMiemSruaWh+acrFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGxlZnRJY29uIOW3puS+p+aMiemSruWbvuagh++8iOWbvuagh+exu+Wei+WPguiAgyBbSWNvbiDlm77moIddKGh0dHA6Ly9leHQuZGNsb3VkLm5ldC5jbi9wbHVnaW4/aWQ9MjgpIHR5cGUg5bGe5oCn77yJXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmlnaHRJY29uIOWPs+S+p+aMiemSruWbvuagh++8iOWbvuagh+exu+Wei+WPguiAgyBbSWNvbiDlm77moIddKGh0dHA6Ly9leHQuZGNsb3VkLm5ldC5jbi9wbHVnaW4/aWQ9MjgpIHR5cGUg5bGe5oCn77yJXG4gKiBAcHJvcGVydHkge1N0cmluZ30gY29sb3Ig5Zu+5qCH5ZKM5paH5a2X6aKc6ImyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gYmFja2dyb3VuZENvbG9yIOWvvOiIquagj+iDjOaZr+minOiJslxuICogQHByb3BlcnR5IHtCb29sZWFufSBmaXhlZCA9IFt0cnVlfGZhbHNlXSDmmK/lkKblm7rlrprpobbpg6hcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc3RhdHVzQmFyID0gW3RydWV8ZmFsc2VdIOaYr+WQpuWMheWQq+eKtuaAgeagj1xuICogQHByb3BlcnR5IHtCb29sZWFufSBzaGFkb3cgPSBbdHJ1ZXxmYWxzZV0g5a+86Iiq5qCP5LiL5piv5ZCm5pyJ6Zi05b2xXG4gKiBAZXZlbnQge0Z1bmN0aW9ufSBjbGlja0xlZnQg5bem5L6n5oyJ6ZKu54K55Ye75pe26Kem5Y+RXG4gKiBAZXZlbnQge0Z1bmN0aW9ufSBjbGlja1JpZ2h0IOWPs+S+p+aMiemSrueCueWHu+aXtuinpuWPkVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6IFwiVW5pTmF2QmFyXCIsXG5cdGNvbXBvbmVudHM6IHtcblx0XHR1bmlTdGF0dXNCYXIsXG5cdFx0dW5pSWNvbnNcblx0fSxcblx0cHJvcHM6IHtcblx0XHR0aXRsZToge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogXCJcIlxuXHRcdH0sXG5cdFx0bGVmdFRleHQ6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiXCJcblx0XHR9LFxuXHRcdHJpZ2h0VGV4dDoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogXCJcIlxuXHRcdH0sXG5cdFx0bGVmdEljb246IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiXCJcblx0XHR9LFxuXHRcdHJpZ2h0SWNvbjoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogXCJcIlxuXHRcdH0sXG5cdFx0Zml4ZWQ6IHtcblx0XHRcdHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuXHRcdFx0ZGVmYXVsdDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y29sb3I6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiIzAwMDAwMFwiXG5cdFx0fSxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiI0ZGRkZGRlwiXG5cdFx0fSxcblx0XHRzdGF0dXNCYXI6IHtcblx0XHRcdHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuXHRcdFx0ZGVmYXVsdDogZmFsc2Vcblx0XHR9LFxuXHRcdHNoYWRvdzoge1xuXHRcdFx0dHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxuXHRcdH0sXG5cdFx0Ym9yZGVyOiB7XG5cdFx0XHR0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcblx0XHRcdGRlZmF1bHQ6IHRydWVcblx0XHR9XG5cdH0sXG5cdG1vdW50ZWQoKSB7XG5cdFx0aWYgKHVuaS5yZXBvcnQgJiYgdGhpcy50aXRsZSAhPT0gJycpIHtcblx0XHRcdHVuaS5yZXBvcnQoJ3RpdGxlJywgdGhpcy50aXRsZSlcblx0XHR9XG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHRvbkNsaWNrTGVmdCgpIHtcblx0XHRcdHRoaXMuJGVtaXQoXCJjbGlja0xlZnRcIik7XG5cdFx0fSxcblx0XHRvbkNsaWNrUmlnaHQoKSB7XG5cdFx0XHR0aGlzLiRlbWl0KFwiY2xpY2tSaWdodFwiKTtcblx0XHR9XG5cdH1cbn07XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanM/P3JlZi0tNi1vbmVPZi0xLTAhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTYtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vdW5pLW5hdi1iYXIudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MTgyODg0ODAmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcz8/cmVmLS02LW9uZU9mLTEtMCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktbmF2LWJhci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xODI4ODQ4MCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1OTU2NzMzMzA2MjRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vdW5pLWljb25zLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYzE5YWJlMiZzY29wZWQ9dHJ1ZSZcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vdW5pLWljb25zLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTFjMTlhYmUyJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxYzE5YWJlMlwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ3b3JrL3Rlc3QvZmVuZ3lhbi1tcC9jb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xNi0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvdGVtcGxhdGUuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvcGFnZS1tZXRhLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktaWNvbnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFjMTlhYmUyJnNjb3BlZD10cnVlJlwiIiwidmFyIGNvbXBvbmVudHNcbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCIvL1xuLy9cbi8vXG4vL1xuXG5pbXBvcnQgaWNvbnMgZnJvbSAnLi9pY29ucy5qcyc7XG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBJY29ucyDlm77moIdcbiAqIEBkZXNjcmlwdGlvbiDnlKjkuo7lsZXnpLogaWNvbnMg5Zu+5qCHXG4gKiBAdHV0b3JpYWwgaHR0cHM6Ly9leHQuZGNsb3VkLm5ldC5jbi9wbHVnaW4/aWQ9MjhcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzaXplIOWbvuagh+Wkp+Wwj1xuICogQHByb3BlcnR5IHtTdHJpbmd9IHR5cGUg5Zu+5qCH5Zu+5qGI77yM5Y+C6ICD56S65L6LXG4gKiBAcHJvcGVydHkge1N0cmluZ30gY29sb3Ig5Zu+5qCH6aKc6ImyXG4gKiBAZXZlbnQge0Z1bmN0aW9ufSBjbGljayDngrnlh7sgSWNvbiDop6blj5Hkuovku7ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiAnVW5pSWNvbnMnLFxuXHRwcm9wczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6ICcnXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogJyMzMzMzMzMnXG5cdFx0fSxcblx0XHRzaXplOiB7XG5cdFx0XHR0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuXHRcdFx0ZGVmYXVsdDogMTZcblx0XHR9XG5cdH0sXG5cdGRhdGEoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGljb25zOiBpY29uc1xuXHRcdH1cblx0fSxcblx0bWV0aG9kczoge1xuXHRcdF9vbkNsaWNrKCkge1xuXHRcdFx0dGhpcy4kZW1pdCgnY2xpY2snKVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xYzE5YWJlMiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1pY29ucy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xYzE5YWJlMiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1OTU2NzMzMzA2MDFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vdW5pLWZhdi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZmMyYzAzMzgmc2NvcGVkPXRydWUmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi91bmktZmF2LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vdW5pLWZhdi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vdW5pLWZhdi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1mYzJjMDMzOCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiZmMyYzAzMzhcIixcbiAgbnVsbCxcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwid29yay90ZXN0L2Zlbmd5YW4tbXAvY29tcG9uZW50cy91bmktZmF2L3VuaS1mYXYudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xNi0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvdGVtcGxhdGUuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvcGFnZS1tZXRhLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktZmF2LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1mYzJjMDMzOCZzY29wZWQ9dHJ1ZSZcIiIsInZhciBjb21wb25lbnRzID0ge1xuICBcInVuaS1pY29uc1wiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW1wb3J0KFxuICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb21wb25lbnRzL3VuaS1pY29ucy91bmktaWNvbnNcIiAqLyBcIkAvY29tcG9uZW50cy91bmktaWNvbnMvdW5pLWljb25zLnZ1ZVwiXG4gICAgKVxuICB9XG59XG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMi0xIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc2NyaXB0LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktZmF2LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTItMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3NjcmlwdC5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vdW5pLWZhdi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCIvL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cblxuaW1wb3J0IHVuaUljb25zIGZyb20gXCIuLi91bmktaWNvbnMvdW5pLWljb25zLnZ1ZVwiO1xuXG4vKipcbiAqIEZhdiDmlLbol4/mjInpkq5cbiAqIEBkZXNjcmlwdGlvbiDnlKjkuo7mlLbol4/lip/og73vvIzlj6/ngrnlh7vliIfmjaLpgInkuK3jgIHkuI3pgInkuK3nmoTnirbmgIFcbiAqIEB0dXRvcmlhbCBodHRwczovL2V4dC5kY2xvdWQubmV0LmNuL3BsdWdpbj9pZD04NjRcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc3RhciA9IFt0cnVlfGZhbHNlXSDmjInpkq7mmK/lkKbluKbmmJ/mmJ9cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBiZ0NvbG9yIOacquaUtuiXj+aXtueahOiDjOaZr+iJslxuICogQHByb3BlcnR5IHtTdHJpbmd9IGJnQ29sb3JDaGVja2VkIOW3suaUtuiXj+aXtueahOiDjOaZr+iJslxuICogQHByb3BlcnR5IHtTdHJpbmd9IGZnQ29sb3Ig5pyq5pS26JeP5pe255qE5paH5a2X6aKc6ImyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZmdDb2xvckNoZWNrZWQg5bey5pS26JeP5pe255qE5paH5a2X6aKc6ImyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGNpcmNsZSA9IFt0cnVlfGZhbHNlXSDmmK/lkKbkuLrlnIbop5JcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gY2hlY2tlZCA9IFt0cnVlfGZhbHNlXSDmmK/lkKbkuLrlt7LmlLbol49cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjb250ZW50VGV4dCA9IFt0cnVlfGZhbHNlXSDmlLbol4/mjInpkq7mloflrZdcbiAqIEBldmVudCB7RnVuY3Rpb259IGNsaWNrIOeCueWHuyBmYXbmjInpkq7op6blj5Hkuovku7ZcbiAqIEBleGFtcGxlIDx1bmktZmF2IDpjaGVja2VkPVwidHJ1ZVwiLz5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiBcIlVuaUZhdlwiLFxuXHRjb21wb25lbnRzOiB7XG5cdFx0dW5pSWNvbnNcblx0fSxcblx0cHJvcHM6IHtcblx0XHRzdGFyOiB7XG5cdFx0XHR0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcblx0XHRcdGRlZmF1bHQ6IHRydWVcblx0XHR9LFxuXHRcdGJnQ29sb3I6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiI2VlZWVlZVwiXG5cdFx0fSxcblx0XHRmZ0NvbG9yOiB7XG5cdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0XHRkZWZhdWx0OiBcIiM2NjY2NjZcIlxuXHRcdH0sXG5cdFx0YmdDb2xvckNoZWNrZWQ6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IFwiIzAwN2FmZlwiXG5cdFx0fSxcblx0XHRmZ0NvbG9yQ2hlY2tlZDoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogXCIjRkZGRkZGXCJcblx0XHR9LFxuXHRcdGNpcmNsZToge1xuXHRcdFx0dHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxuXHRcdH0sXG5cdFx0Y2hlY2tlZDoge1xuXHRcdFx0dHlwZTogQm9vbGVhbixcblx0XHRcdGRlZmF1bHQ6IGZhbHNlXG5cdFx0fSxcblx0XHRjb250ZW50VGV4dDoge1xuXHRcdFx0dHlwZTogT2JqZWN0LFxuXHRcdFx0ZGVmYXVsdCAoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29udGVudERlZmF1bHQ6IFwi5pS26JePXCIsXG5cdFx0XHRcdFx0Y29udGVudEZhdjogXCLlt7LmlLbol49cIlxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0d2F0Y2g6IHtcblx0XHRjaGVja2VkKCkge1xuXHRcdFx0aWYgKHVuaS5yZXBvcnQpIHtcblx0XHRcdFx0aWYgKHRoaXMuY2hlY2tlZCkge1xuXHRcdFx0XHRcdHVuaS5yZXBvcnQoXCLmlLbol49cIiwgXCLmlLbol49cIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dW5pLnJlcG9ydChcIuWPlua2iOaUtuiXj1wiLCBcIuWPlua2iOaUtuiXj1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0bWV0aG9kczoge1xuXHRcdG9uQ2xpY2soKSB7XG5cdFx0XHR0aGlzLiRlbWl0KFwiY2xpY2tcIik7XG5cdFx0fVxuXHR9XG59O1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3VuaS1mYXYudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZmMyYzAzMzgmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcz8/cmVmLS02LW9uZU9mLTEtMCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi91bmktZmF2LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWZjMmMwMzM4JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU5NTY3MzMzMDY4M1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCJEOi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiaG1yXCI6dHJ1ZSxcInB1YmxpY1BhdGhcIjpcIi4uLy4uL1wiLFwibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ==