import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/joblist",
      name: "joblist",
      component: () => import('./components/JobList.vue')
    },
    {
      path: "/jobdetail/:id",
      name: "jobdetail",
      component: () => import('./components/JobDetail.vue')
    },
  ]
})

// to fix navigation warning on router
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
