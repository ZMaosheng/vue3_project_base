// import routes from './routes/modules/operate';
const createRoute = (routes) => {
  return routes.map((item) => {
    const children = item.children ? item.children : [];
    let result = null;
    if (item.type === 'button') {
      result = item;
    } else {
      result = {
        path: '/' + item.path,
        name: item.path,
        component: () => import(`/src/views/${item.component}/index.vue`),
        meta: {
          icon: item.icon,
          title: item.name,
          isShow: item.isShow,
          buttons: children.filter((child) => {
            return child.type === 'button';
          }),
        },
        children: createRoute(
          children.filter((child) => {
            return child.type !== 'button';
          })
        ),
      };
      if (item.redirect) {
        result.redirect = '/' + item.redirect;
      }
    }
    return result;
  });
};

export default createRoute;
