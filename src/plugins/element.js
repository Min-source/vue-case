import Vue from 'vue'
import { Alert, Aside, Button, Col, Container, Dialog, Footer, Form, FormItem, Header, Input, Loading, Menu, MenuItem, MenuItemGroup, Submenu, Table, TableColumn , Notification , MessageBox ,Message} from 'element-ui'

//应用插件
Vue.use(Button)
Vue.use(Alert)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;