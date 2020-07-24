(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/mine/mine"],{

/***/ 56:
/*!*******************************************************************!*\
  !*** D:/work/test/ygctour/main.js?{"page":"pages%2Fmine%2Fmine"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _mine = _interopRequireDefault(__webpack_require__(/*! ./pages/mine/mine.vue */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_mine.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 57:
/*!************************************************!*\
  !*** D:/work/test/ygctour/pages/mine/mine.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mine.vue?vue&type=template&id=2e2cb8f6& */ 58);
/* harmony import */ var _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mine.vue?vue&type=script&lang=js& */ 60);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mine.vue?vue&type=style&index=0&lang=css& */ 63);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/ygctour/pages/mine/mine.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 58:
/*!*******************************************************************************!*\
  !*** D:/work/test/ygctour/pages/mine/mine.vue?vue&type=template&id=2e2cb8f6& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=template&id=2e2cb8f6& */ 59);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_2e2cb8f6___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 59:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/mine/mine.vue?vue&type=template&id=2e2cb8f6& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 60:
/*!*************************************************************************!*\
  !*** D:/work/test/ygctour/pages/mine/mine.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=script&lang=js& */ 61);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 61:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/mine/mine.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;















































var _vuex = __webpack_require__(/*! vuex */ 16);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =




{
  data: function data() {
    return {
      tipList: [
      { key: "1", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "洱海·云南省大理市" },
      { key: "2", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "云南" },
      { key: "3", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "大理" },
      { key: "4", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "泸沽湖" },
      { key: "6", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "洱海·云南省大理市" },
      { key: "7", tipTitle: "内容主标题（展示20个字符）", tipBody: "这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文", tipAdress: "洱海·云南省大理市" }] };


  },
  computed: (0, _vuex.mapState)(['forcedLogin', 'hasLogin', 'phone']),
  onLoad: function onLoad() {var _this = this;

    var uniIdToken = uni.getStorageSync('uniIdToken');
    this.login(uni.getStorageSync('phone'));
    if (uniIdToken) {
      uniCloud.callFunction({
        name: 'user-center',
        data: {
          action: 'checkToken' },

        success: function success(e) {

          console.log('checkToken success', e);

          if (e.result.code > 0) {
            //token过期或token不合法，重新登录
            if (_this.forcedLogin) {
              uni.reLaunch({
                url: '../login/login' });

            } else {
              uni.navigateTo({
                url: '../login/login' });

            }
          }
        },
        fail: function fail(e) {
          uni.showModal({
            content: JSON.stringify(e) });

        } });

    } else {
      this.guideToLogin();
    }
  },
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['login']), {
    guideToLogin: function guideToLogin() {
      if (this.forcedLogin) {
        uni.navigateTo({
          url: '../login/login' });

      }
      // uni.showModal({
      // 	title: '未登录',
      // 	content: '您未登录，需要登录后才能继续',
      // 	/**
      // 	 * 如果需要强制登录，不显示取消按钮
      // 	 */
      // 	showCancel: this.forcedLogin,
      // 	success: (res) => {
      // 		if (res.confirm) {
      // 			/**
      // 			 * 如果需要强制登录，使用reLaunch方式
      // 			 */
      // 			if (this.forcedLogin) {
      // 				uni.reLaunch({
      // 					url: '../login/login'
      // 				});
      // 			} else {
      // 				uni.navigateTo({
      // 					url: '../login/login'
      // 				});
      // 			}
      // 		}
      // 	}
      // });
    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 62)["default"]))

/***/ }),

/***/ 63:
/*!*********************************************************************************!*\
  !*** D:/work/test/ygctour/pages/mine/mine.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=style&index=0&lang=css& */ 64);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 64:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/mine/mine.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[56,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbWluZS9taW5lLnZ1ZT8yOWZlIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QveWdjdG91ci9wYWdlcy9taW5lL21pbmUudnVlPzI5YWEiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL21pbmUvbWluZS52dWU/NTA0MSIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbWluZS9taW5lLnZ1ZT82Mjk0Iiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QveWdjdG91ci9wYWdlcy9taW5lL21pbmUudnVlIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QveWdjdG91ci9wYWdlcy9taW5lL21pbmUudnVlP2VlNmMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL21pbmUvbWluZS52dWU/ZmZkYiJdLCJuYW1lcyI6WyJjcmVhdGVQYWdlIiwiUGFnZSIsImRhdGEiLCJ0aXBMaXN0Iiwia2V5IiwidGlwVGl0bGUiLCJ0aXBCb2R5IiwidGlwQWRyZXNzIiwiY29tcHV0ZWQiLCJvbkxvYWQiLCJ1bmlJZFRva2VuIiwidW5pIiwiZ2V0U3RvcmFnZVN5bmMiLCJsb2dpbiIsInVuaUNsb3VkIiwiY2FsbEZ1bmN0aW9uIiwibmFtZSIsImFjdGlvbiIsInN1Y2Nlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsInJlc3VsdCIsImNvZGUiLCJmb3JjZWRMb2dpbiIsInJlTGF1bmNoIiwidXJsIiwibmF2aWdhdGVUbyIsImZhaWwiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImd1aWRlVG9Mb2dpbiIsIm1ldGhvZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0RBQUEsd0NBQW1CO0FBQ25CO0FBQ0EseUY7QUFDQUEsVUFBVSxDQUFDQyxhQUFE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O0FBR0E7QUFDRDtBQUNELFNBckJvQjtBQXNCckJFLFlBdEJxQixnQkFzQmhCVCxDQXRCZ0IsRUFzQmI7QUFDUFIsYUFBRyxDQUFDa0IsU0FBSixDQUFjO0FBQ2JDLG1CQUFPLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlYixDQUFmLENBREksRUFBZDs7QUFHQSxTQTFCb0IsRUFBdEI7O0FBNEJBLEtBN0JELE1BNkJPO0FBQ04sV0FBS2MsWUFBTDtBQUNBO0FBQ0QsR0FsRGE7QUFtRGRDLFNBQU87QUFDSCwwQkFBYSxDQUFDLE9BQUQsQ0FBYixDQURHO0FBRU5ELGdCQUZNLDBCQUVTO0FBQ2QsVUFBSSxLQUFLVCxXQUFULEVBQXNCO0FBQ3JCYixXQUFHLENBQUNnQixVQUFKLENBQWU7QUFDZEQsYUFBRyxFQUFFLGdCQURTLEVBQWY7O0FBR0E7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQWhDSyxHQW5ETyxFOzs7Ozs7Ozs7Ozs7O0FDckRmO0FBQUE7QUFBQTtBQUFBO0FBQTR2QyxDQUFnQixzdENBQUcsRUFBQyxDOzs7Ozs7Ozs7OztBQ0FoeEM7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZCIsImZpbGUiOiJwYWdlcy9taW5lL21pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3VuaS1wYWdlcyc7aW1wb3J0ICdAZGNsb3VkaW8vdW5pLXN0YXQnO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgUGFnZSBmcm9tICcuL3BhZ2VzL21pbmUvbWluZS52dWUnXG5jcmVhdGVQYWdlKFBhZ2UpIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9taW5lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yZTJjYjhmNiZcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL21pbmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9taW5lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9taW5lLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwid29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbWluZS9taW5lLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTYtMCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3RlbXBsYXRlLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3BhZ2UtbWV0YS5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWluZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmUyY2I4ZjYmXCIiLCJ2YXIgY29tcG9uZW50c1xudmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG59XG52YXIgcmVjeWNsYWJsZVJlbmRlciA9IGZhbHNlXG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTItMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3NjcmlwdC5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWluZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL21pbmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG5cbmltcG9ydCB7XG5cdG1hcFN0YXRlLFxuXHRtYXBNdXRhdGlvbnNcbn0gZnJvbSAndnVleCdcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkYXRhKCl7XG5cdFx0cmV0dXJue1xuXHRcdFx0dGlwTGlzdDpbXG5cdFx0XHRcdHtrZXk6XCIxXCIsdGlwVGl0bGU6XCLlhoXlrrnkuLvmoIfpopjvvIjlsZXnpLoyMOS4quWtl+espu+8iVwiLHRpcEJvZHk6XCLov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlofov5nph4zmmK/mraPmlodcIix0aXBBZHJlc3M6XCLmtLHmtbfCt+S6keWNl+ecgeWkp+eQhuW4glwifSxcblx0XHRcdFx0e2tleTpcIjJcIix0aXBUaXRsZTpcIuWGheWuueS4u+agh+mimO+8iOWxleekujIw5Liq5a2X56ym77yJXCIsdGlwQm9keTpcIui/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh1wiLHRpcEFkcmVzczpcIuS6keWNl1wifSxcblx0XHRcdFx0e2tleTpcIjNcIix0aXBUaXRsZTpcIuWGheWuueS4u+agh+mimO+8iOWxleekujIw5Liq5a2X56ym77yJXCIsdGlwQm9keTpcIui/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh1wiLHRpcEFkcmVzczpcIuWkp+eQhlwifSxcblx0XHRcdFx0e2tleTpcIjRcIix0aXBUaXRsZTpcIuWGheWuueS4u+agh+mimO+8iOWxleekujIw5Liq5a2X56ym77yJXCIsdGlwQm9keTpcIui/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh1wiLHRpcEFkcmVzczpcIuazuOayvea5llwifSxcblx0XHRcdFx0e2tleTpcIjZcIix0aXBUaXRsZTpcIuWGheWuueS4u+agh+mimO+8iOWxleekujIw5Liq5a2X56ym77yJXCIsdGlwQm9keTpcIui/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh+i/memHjOaYr+ato+aWh1wiLHRpcEFkcmVzczpcIua0sea1t8K35LqR5Y2X55yB5aSn55CG5biCXCJ9LFxuXHRcdFx0XHR7a2V5OlwiN1wiLHRpcFRpdGxlOlwi5YaF5a655Li75qCH6aKY77yI5bGV56S6MjDkuKrlrZfnrKbvvIlcIix0aXBCb2R5Olwi6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paH6L+Z6YeM5piv5q2j5paHXCIsdGlwQWRyZXNzOlwi5rSx5rW3wrfkupHljZfnnIHlpKfnkIbluIJcIn1cblx0XHRcdF0sXG5cdFx0fVxuXHR9LFxuXHRjb21wdXRlZDogbWFwU3RhdGUoWydmb3JjZWRMb2dpbicsICdoYXNMb2dpbicsICdwaG9uZSddKSxcblx0b25Mb2FkKCkge1xuXG5cdFx0bGV0IHVuaUlkVG9rZW4gPSB1bmkuZ2V0U3RvcmFnZVN5bmMoJ3VuaUlkVG9rZW4nKVxuXHRcdHRoaXMubG9naW4odW5pLmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpKVxuXHRcdGlmICh1bmlJZFRva2VuKSB7XG5cdFx0XHR1bmlDbG91ZC5jYWxsRnVuY3Rpb24oe1xuXHRcdFx0XHRuYW1lOiAndXNlci1jZW50ZXInLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0YWN0aW9uOiAnY2hlY2tUb2tlbicsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChlKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zb2xlLmxvZygnY2hlY2tUb2tlbiBzdWNjZXNzJywgZSk7XG5cblx0XHRcdFx0XHRpZiAoZS5yZXN1bHQuY29kZSA+IDApIHtcblx0XHRcdFx0XHRcdC8vdG9rZW7ov4fmnJ/miJZ0b2tlbuS4jeWQiOazle+8jOmHjeaWsOeZu+W9lVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZm9yY2VkTG9naW4pIHtcblx0XHRcdFx0XHRcdFx0dW5pLnJlTGF1bmNoKHtcblx0XHRcdFx0XHRcdFx0XHR1cmw6ICcuLi9sb2dpbi9sb2dpbidcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR1bmkubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0XHRcdFx0dXJsOiAnLi4vbG9naW4vbG9naW4nXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFpbChlKSB7XG5cdFx0XHRcdFx0dW5pLnNob3dNb2RhbCh7XG5cdFx0XHRcdFx0XHRjb250ZW50OiBKU09OLnN0cmluZ2lmeShlKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZ3VpZGVUb0xvZ2luKClcblx0XHR9XG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHQuLi5tYXBNdXRhdGlvbnMoWydsb2dpbiddKSxcblx0XHRndWlkZVRvTG9naW4oKSB7XG5cdFx0XHRpZiAodGhpcy5mb3JjZWRMb2dpbikge1xuXHRcdFx0XHR1bmkubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnLi4vbG9naW4vbG9naW4nLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdC8vIHVuaS5zaG93TW9kYWwoe1xuXHRcdFx0Ly8gXHR0aXRsZTogJ+acqueZu+W9lScsXG5cdFx0XHQvLyBcdGNvbnRlbnQ6ICfmgqjmnKrnmbvlvZXvvIzpnIDopoHnmbvlvZXlkI7miY3og73nu6fnu60nLFxuXHRcdFx0Ly8gXHQvKipcblx0XHRcdC8vIFx0ICog5aaC5p6c6ZyA6KaB5by65Yi255m75b2V77yM5LiN5pi+56S65Y+W5raI5oyJ6ZKuXG5cdFx0XHQvLyBcdCAqL1xuXHRcdFx0Ly8gXHRzaG93Q2FuY2VsOiB0aGlzLmZvcmNlZExvZ2luLFxuXHRcdFx0Ly8gXHRzdWNjZXNzOiAocmVzKSA9PiB7XG5cdFx0XHQvLyBcdFx0aWYgKHJlcy5jb25maXJtKSB7XG5cdFx0XHQvLyBcdFx0XHQvKipcblx0XHRcdC8vIFx0XHRcdCAqIOWmguaenOmcgOimgeW8uuWItueZu+W9le+8jOS9v+eUqHJlTGF1bmNo5pa55byPXG5cdFx0XHQvLyBcdFx0XHQgKi9cblx0XHRcdC8vIFx0XHRcdGlmICh0aGlzLmZvcmNlZExvZ2luKSB7XG5cdFx0XHQvLyBcdFx0XHRcdHVuaS5yZUxhdW5jaCh7XG5cdFx0XHQvLyBcdFx0XHRcdFx0dXJsOiAnLi4vbG9naW4vbG9naW4nXG5cdFx0XHQvLyBcdFx0XHRcdH0pO1xuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcblx0XHRcdC8vIFx0XHRcdFx0dW5pLm5hdmlnYXRlVG8oe1xuXHRcdFx0Ly8gXHRcdFx0XHRcdHVybDogJy4uL2xvZ2luL2xvZ2luJ1xuXHRcdFx0Ly8gXHRcdFx0XHR9KTtcblx0XHRcdC8vIFx0XHRcdH1cblx0XHRcdC8vIFx0XHR9XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIH0pO1xuXHRcdH1cblx0fVxuXG59XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanM/P3JlZi0tNi1vbmVPZi0xLTAhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTYtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWluZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL21pbmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTk1NTUxMjk1MDA0XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIkQ6L3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJobXJcIjp0cnVlLFwicHVibGljUGF0aFwiOlwiLi4vLi4vXCIsXCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9