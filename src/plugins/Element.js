import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import {
  Button,
  Select,
  Option,
  Loading,
  MessageBox,
  Notification,
  Message
} from "element-ui";

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
