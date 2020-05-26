import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',
    component: Layout,
	  redirect: '/index/index',
	  hidden:true
  },
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
      icon: 'el-icon-s-home',
		},
		noDropdown:true,
		children:[
			{
				path:'index',
				meta:{
					title:'首页',
					icon:'el-icon-s-home',
          routerType:'leftmenu'
				},
            component: () => import('@/page/index/index'),
			}
		]
	}
]

	//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/permission/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path:'/userManage',
    name: 'userManage',
    meta: {
      title:'人员管理',
      icon: 'el-icon-user-solid',
      roles: ['Administrator', 'Captain']
    },
    component:Layout,
    children:[
      {
        path:'infoManage',
        name:'infoManage',
        meta: {
          title:'信息管理',
          icon: 'el-icon-collection',
          routerType:'leftmenu',
          roles: ['Administrator', 'Captain']
        },
        component: () => import('@/page/userManage/infoManage'),
      },
      {
        path:'permissionManage',
        name:'permissionManage',
        meta: {
          title:'权限管理',
          icon: 'el-icon-magic-stick',
          routerType:'leftmenu',
          roles: ['Administrator', 'Captain']
        },
        component: () => import('@/page/infoManage/changeRole'),
      },{
        path:'changePassword',
        name:'changePassword',
        meta: {
          title:'密码管理',
          icon: 'el-icon-coin',
          routerType:'leftmenu',
          roles: ['Administrator', 'Captain']
        },
        component: () => import('@/page/infoManage/changePassword'),
      },
    ]
  },
  {
    path:'/scoreManage',
    name: 'scoreManage',
    meta: {
      title:'成绩管理',
      icon: 'el-icon-s-data',
      roles: ['Administrator', 'Captain']
    },
    component:Layout,
    children:[
      {
        path:'scoreInput',
        name:'scoreInput',
        meta: {
          title:'成绩输入',
          icon: 'el-icon-edit',
          routerType:'leftmenu',
          roles: ['Administrator', 'Captain']
        },
        component: () => import('@/page/scoreManage/scoreInput'),
      },
      {
        path:'scoreAnalysis',
        name:'scoreAnalysis',
        meta: {
          title:'成绩分析',
          icon: 'el-icon-coordinate',
          routerType:'leftmenu',
          roles: ['Administrator', 'Captain']
        },
        component: () => import('@/page/scoreManage/scoreAnalysis'),
      }
    ]
  },
	{
		path:'/personalScore',
		name: 'personalScore',
		component:Layout,
		meta: {
			title:'个人成绩',
			icon: 'el-icon-s-custom',
      roles: ['User', 'Captain']
		},
		children:[
			{
				path:'scoreChart',
        name:'scoreChart',
				meta:{
				  title:'成绩图表',
				  icon:'el-icon-s-data',
				  routerType:'leftmenu',
          roles: ['User', 'Captain']
				},
				component: () => import('@/page/personalScore/scoreChart'),
			},
      {
        path:'scoreList',
        name:'scoreList',
        meta:{
          title:'成绩列表',
          icon:'el-icon-document',
          routerType:'leftmenu',
          roles: ['User', 'Captain']
        },
        component: () => import('@/page/personalScore/scoreList'),
      }
		]
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'el-icon-film',
      roles: ['User', 'Captain']
	  },
	  component:Layout,
	  children:[
		{
		   path:'infoShow',
		   name:'infoShow',
		   meta: {
					title:'个人信息',
					icon: 'iconinfo',
					routerType:'leftmenu',
         roles: ['User', 'Captain']
			 },
      component: () => import('@/page/infoManage/infoShow'),
		},
		{
			path:'infoModify',
			name:'infoModify',
			meta: {
				title:'修改信息',
				icon: 'iconinfo',
				routerType:'leftmenu',
        roles: ['User', 'Captain']
			},
      component: () => import('@/page/infoManage/infoModify'),
		 }
	  ]
	},
  {
    path: '/error',
    component: Layout,
    name: 'errorPage',
    meta: {
      title: '错误页面',
      icon: 'el-icon-close',
      roles: ['Administrator']
    },
    children: [
			{
				path: '401',
				name: 'page401',
				component: () => import('@/page/errorPage/401'),
				meta: {
					title: '401',
					noCache: true,
          roles: ['Administrator']
			  }
			},
			{
				path: '404',
				name: 'page404',
				component: () => import('@/page/errorPage/404'),
				meta: {
					title: '404',
					noCache: true,
          roles: ['Administrator']
				}
			}
    ]
  },
	{ path: '*', redirect: '/404', hidden: true }
	];

	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 *
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 *
	 *
	 *
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 *
	 *
	 *
	 */

