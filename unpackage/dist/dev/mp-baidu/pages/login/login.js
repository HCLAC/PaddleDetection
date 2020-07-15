(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/login"],{

/***/ 76:
/*!*********************************************************************!*\
  !*** D:/work/test/ygctour/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ 77));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 77:
/*!**************************************************!*\
  !*** D:/work/test/ygctour/pages/login/login.vue ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=4cae4eb9& */ 78);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 80);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=css& */ 82);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "work/test/ygctour/pages/login/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 78:
/*!*********************************************************************************!*\
  !*** D:/work/test/ygctour/pages/login/login.vue?vue&type=template&id=4cae4eb9& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=4cae4eb9& */ 79);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_4cae4eb9___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 79:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/login/login.vue?vue&type=template&id=4cae4eb9& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 80:
/*!***************************************************************************!*\
  !*** D:/work/test/ygctour/pages/login/login.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 81);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 81:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/login/login.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
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
var _default =

{
  data: function data() {
    return {
      status: true, // 账号密码验证
      username: "",
      password: "",
      phone: "",
      code: "",
      codeTime: 0,
      loading: false };

  },
  components: {},


  mounted: function mounted() {

  },
  computed: {
    disabled: function disabled() {
      if (this.phone === '' || this.code === '') {
        return true;
      }
      return false;
    } },

  methods: {
    // 初始化表单
    initForm: function initForm() {
      // this.username = ''
      // this.password = ''
      this.phone = '';
      this.code = '';

    },
    // 获取验证码
    getCode: function getCode() {var _this = this;
      // 防止重复获取
      if (this.codeTime > 0) {
        return;
      }
      // 验证手机号
      if (!this.validate()) return;
      // 请求数据
      this.$H.post('/user/sendcode', {
        phone: this.phone },
      {
        // 这样原生数据就会传输过来
        native: true }).
      then(function (res) {
        // console.log(res)
        uni.showToast({
          title: res.data.msg,
          icon: 'none' });

      }).catch(function (err) {
        // console.log(err)
      });

      // 倒计时
      this.codeTime = 5;
      // 箭头函数可以直接拿到外面的this的内容
      var timer = setInterval(function () {
        if (_this.codeTime >= 1) {
          _this.codeTime--;
        } else {
          clearInterval(timer);
        }
      }, 1000);

    },
    // 表单验证
    validate: function validate() {
      //手机号正则 只是针对验证码的手机号字段，其他并未做兼容。
      var mPattern = /^1[34578]\d{9}$/;
      if (!mPattern.test(this.phone)) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none' });

        return false;
      }
      // ...更多验证
      return true;
    },
    // 提交
    submit: function submit() {var _this2 = this;
      this.loading = '登录中...';
      var url = "";
      var data = "";
      // 表单验证
      if (!this.status) {
        if (!this.validate()) return;
      }
      if (this.status) {
        // 账号密码登录
        url = '/user/login';
        data = {
          username: this.username,
          password: this.password };

      } else {

        // 手机验证码登录
        url = '/user/phonelogin';
        data = {
          phone: this.phone,
          code: this.code };

      }

      // 提交后端
      this.$H.post(url, data).then(function (res) {
        // console.log(res)
        // 修改vuex的state，持久化存储
        _this2.$store.commit('login', res);
        // 提示和跳转
        uni.navigateBack({
          delta: 1 });

        uni.showToast({
          title: '登录成功',
          icon: 'none' });

        _this2.loading = '';
      }).catch(
      this.loading = '');

      // 登录成功处理
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 82:
/*!***********************************************************************************!*\
  !*** D:/work/test/ygctour/pages/login/login.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../study/stage3/minip/09/HBuilderX.2.6.16.20200424.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=style&index=0&lang=css& */ 83);
/* harmony import */ var _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_study_stage3_minip_09_HBuilderX_2_6_16_20200424_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 83:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/test/ygctour/pages/login/login.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[76,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbG9naW4vbG9naW4udnVlPzE2ZjgiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZT8xMTNlIiwid2VicGFjazovLy9EOi93b3JrL3Rlc3QveWdjdG91ci9wYWdlcy9sb2dpbi9sb2dpbi52dWU/MmEyZCIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbG9naW4vbG9naW4udnVlPzA0ZGEiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vRDovd29yay90ZXN0L3lnY3RvdXIvcGFnZXMvbG9naW4vbG9naW4udnVlPzE5NjkiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZT9kYTY2Il0sIm5hbWVzIjpbImNyZWF0ZVBhZ2UiLCJQYWdlIiwiZGF0YSIsInN0YXR1cyIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJwaG9uZSIsImNvZGUiLCJjb2RlVGltZSIsImxvYWRpbmciLCJjb21wb25lbnRzIiwibW91bnRlZCIsImNvbXB1dGVkIiwiZGlzYWJsZWQiLCJtZXRob2RzIiwiaW5pdEZvcm0iLCJnZXRDb2RlIiwidmFsaWRhdGUiLCIkSCIsInBvc3QiLCJuYXRpdmUiLCJ0aGVuIiwicmVzIiwidW5pIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtc2ciLCJpY29uIiwiY2F0Y2giLCJlcnIiLCJ0aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1QYXR0ZXJuIiwidGVzdCIsInN1Ym1pdCIsInVybCIsIiRzdG9yZSIsImNvbW1pdCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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Q0EsY0FBSSxDQUFDZSxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsRUFBMkJoQixHQUEzQjtBQUNBO0FBQ0FDLFdBQUcsQ0FBQ2dCLFlBQUosQ0FBaUI7QUFDaEJDLGVBQUssRUFBQyxDQURVLEVBQWpCOztBQUdBakIsV0FBRyxDQUFDQyxTQUFKLENBQWM7QUFDYkMsZUFBSyxFQUFDLE1BRE87QUFFYkUsY0FBSSxFQUFDLE1BRlEsRUFBZDs7QUFJQSxjQUFJLENBQUNsQixPQUFMLEdBQWUsRUFBZjtBQUNBLE9BYkQsRUFhR21CLEtBYkg7QUFjQyxXQUFLbkIsT0FBTCxHQUFlLEVBZGhCOztBQWdCQTtBQUNBLEtBdkdPLEVBMUJLLEU7Ozs7Ozs7Ozs7Ozs7QUM5Q2Y7QUFBQTtBQUFBO0FBQUE7QUFBNnZDLENBQWdCLHV0Q0FBRyxFQUFDLEM7Ozs7Ozs7Ozs7O0FDQWp4QztBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkIiwiZmlsZSI6InBhZ2VzL2xvZ2luL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd1bmktcGFnZXMnO2ltcG9ydCAnQGRjbG91ZGlvL3VuaS1zdGF0JztcbmltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlcy9sb2dpbi9sb2dpbi52dWUnXG5jcmVhdGVQYWdlKFBhZ2UpIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9sb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGNhZTRlYjkmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9sb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9sb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGwsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIndvcmsvdGVzdC95Z2N0b3VyL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTYtMCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3RlbXBsYXRlLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3BhZ2UtbWV0YS5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRjYWU0ZWI5JlwiIiwidmFyIGNvbXBvbmVudHNcbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL2xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTItMSEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3NjcmlwdC5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkYXRhKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdGF0dXM6dHJ1ZSwvLyDotKblj7flr4bnoIHpqozor4Fcblx0XHRcdHVzZXJuYW1lOlwiXCIsXG5cdFx0XHRwYXNzd29yZDpcIlwiLFxuXHRcdFx0cGhvbmU6XCJcIixcblx0XHRcdGNvZGU6XCJcIixcblx0XHRcdGNvZGVUaW1lOjAsXG5cdFx0XHRsb2FkaW5nOmZhbHNlXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnRzOiB7XG5cdFx0XG5cdH0sXG5cdG1vdW50ZWQoKSB7XG5cdFx0XG5cdH0sXG5cdGNvbXB1dGVkOntcblx0XHRkaXNhYmxlZCgpe1xuXHRcdFx0aWYodGhpcy5waG9uZT09PScnfHx0aGlzLmNvZGU9PT0nJyl7XG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHQvLyDliJ3lp4vljJbooajljZVcblx0XHRpbml0Rm9ybSgpe1xuXHRcdFx0Ly8gdGhpcy51c2VybmFtZSA9ICcnXG5cdFx0XHQvLyB0aGlzLnBhc3N3b3JkID0gJydcblx0XHRcdHRoaXMucGhvbmUgPSAnJ1xuXHRcdFx0dGhpcy5jb2RlID0gJydcblx0XHRcdFxuXHRcdH0sXG5cdFx0Ly8g6I635Y+W6aqM6K+B56CBXG5cdFx0Z2V0Q29kZSgpe1xuXHRcdFx0Ly8g6Ziy5q2i6YeN5aSN6I635Y+WXG5cdFx0XHRpZiAodGhpcy5jb2RlVGltZT4wKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8g6aqM6K+B5omL5py65Y+3XG5cdFx0XHRpZiAoIXRoaXMudmFsaWRhdGUoKSkgcmV0dXJuO1xuXHRcdFx0Ly8g6K+35rGC5pWw5o2uXG5cdFx0XHR0aGlzLiRILnBvc3QoJy91c2VyL3NlbmRjb2RlJyx7XG5cdFx0XHRcdHBob25lOnRoaXMucGhvbmVcblx0XHRcdH0se1xuXHRcdFx0XHQvLyDov5nmoLfljp/nlJ/mlbDmja7lsLHkvJrkvKDovpPov4fmnaVcblx0XHRcdFx0bmF0aXZlOnRydWVcblx0XHRcdH0pLnRoZW4ocmVzPT57XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHJlcylcblx0XHRcdFx0dW5pLnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0dGl0bGU6cmVzLmRhdGEubXNnLFxuXHRcdFx0XHRcdGljb246J25vbmUnXG5cdFx0XHRcdH0pXG5cdFx0XHR9KS5jYXRjaChlcnI9Pntcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coZXJyKVxuXHRcdFx0fSlcblx0XHRcdFxuXHRcdFx0Ly8g5YCS6K6h5pe2XG5cdFx0XHR0aGlzLmNvZGVUaW1lID0gNVxuXHRcdFx0Ly8g566t5aS05Ye95pWw5Y+v5Lul55u05o6l5ou/5Yiw5aSW6Z2i55qEdGhpc+eahOWGheWuuVxuXHRcdFx0bGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCk9Pntcblx0XHRcdFx0aWYgKHRoaXMuY29kZVRpbWUgPj0gMSl7XG5cdFx0XHRcdFx0dGhpcy5jb2RlVGltZS0tXG5cdFx0XHRcdH0gZWxzZXtcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKVxuXHRcdFx0XHR9XG5cdFx0XHR9LDEwMDApXG5cdFx0XHRcblx0XHR9LFxuXHRcdC8vIOihqOWNlemqjOivgVxuXHRcdHZhbGlkYXRlKCl7XG5cdFx0XHQvL+aJi+acuuWPt+ato+WImSDlj6rmmK/pkojlr7npqozor4HnoIHnmoTmiYvmnLrlj7flrZfmrrXvvIzlhbbku5blubbmnKrlgZrlhbzlrrnjgIJcblx0XHRcdHZhciBtUGF0dGVybiA9IC9eMVszNDU3OF1cXGR7OX0kLzsgXG5cdFx0XHRpZiAoIW1QYXR0ZXJuLnRlc3QodGhpcy5waG9uZSkpIHtcblx0XHRcdFx0dW5pLnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0dGl0bGU6ICfmiYvmnLrlj7fmoLzlvI/kuI3mraPnoa4nLFxuXHRcdFx0XHRcdGljb246ICdub25lJ1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0XHQvLyAuLi7mm7TlpJrpqozor4Fcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fSxcblx0XHQvLyDmj5DkuqRcblx0XHRzdWJtaXQoKXtcblx0XHRcdHRoaXMubG9hZGluZyA9ICfnmbvlvZXkuK0uLi4nXG5cdFx0XHRsZXQgdXJsID0gXCJcIlxuXHRcdFx0bGV0IGRhdGEgPSBcIlwiXG5cdFx0XHQvLyDooajljZXpqozor4Fcblx0XHRcdGlmKCF0aGlzLnN0YXR1cyl7XG5cdFx0XHRcdGlmICghdGhpcy52YWxpZGF0ZSgpKSByZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5zdGF0dXMpe1xuXHRcdFx0XHQvLyDotKblj7flr4bnoIHnmbvlvZVcblx0XHRcdFx0dXJsID0gJy91c2VyL2xvZ2luJ1xuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdHVzZXJuYW1lOnRoaXMudXNlcm5hbWUsXG5cdFx0XHRcdFx0cGFzc3dvcmQ6dGhpcy5wYXNzd29yZFxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIOaJi+acuumqjOivgeeggeeZu+W9lVxuXHRcdFx0XHR1cmwgPSAnL3VzZXIvcGhvbmVsb2dpbidcblx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHRwaG9uZTp0aGlzLnBob25lLFxuXHRcdFx0XHRcdGNvZGU6dGhpcy5jb2RlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8g5o+Q5Lqk5ZCO56uvXG5cdFx0XHR0aGlzLiRILnBvc3QodXJsLGRhdGEpLnRoZW4ocmVzPT57XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHJlcylcblx0XHRcdFx0Ly8g5L+u5pS5dnVleOeahHN0YXRl77yM5oyB5LmF5YyW5a2Y5YKoXG5cdFx0XHRcdHRoaXMuJHN0b3JlLmNvbW1pdCgnbG9naW4nLHJlcylcblx0XHRcdFx0Ly8g5o+Q56S65ZKM6Lez6L2sXG5cdFx0XHRcdHVuaS5uYXZpZ2F0ZUJhY2soe1xuXHRcdFx0XHRcdGRlbHRhOjFcblx0XHRcdFx0fSlcblx0XHRcdFx0dW5pLnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0dGl0bGU6J+eZu+W9leaIkOWKnycsXG5cdFx0XHRcdFx0aWNvbjonbm9uZSdcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gJydcblx0XHRcdH0pLmNhdGNoKFxuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSAnJ1xuXHRcdFx0KVxuXHRcdFx0Ly8g55m75b2V5oiQ5Yqf5aSE55CGXG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanM/P3JlZi0tNi1vbmVPZi0xLTAhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTYtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMiEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcz8/cmVmLS02LW9uZU9mLTEtMCEuLi8uLi8uLi8uLi8uLi9zdHVkeS9zdGFnZTMvbWluaXAvMDkvSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vLi4vc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL3N0dWR5L3N0YWdlMy9taW5pcC8wOS9IQnVpbGRlclguMi42LjE2LjIwMjAwNDI0LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi9sb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1OTQ3OTg3NDM4MTdcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovc3R1ZHkvc3RhZ2UzL21pbmlwLzA5L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=