const routes = [
  { path: '/tools', component: Tools },
  { path: '/persons', component: Persons },
  { path: '/', component: Main },
  { path : '/locations', component: Locations},
  { path : '/organizations', component: Organizations}
]

const router = new VueRouter({
  routes
})
