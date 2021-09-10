const routes = [
  { path: '/tools', component: Tools },
  { path: '/persons', component: Persons },
  { path: '/', component: Main },
  { path : '/locations', component: Locations}
]

const router = new VueRouter({
  routes
})
