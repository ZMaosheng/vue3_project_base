const createMenu = (routes) => {
  let result = [];
  routes.map((item) => {
    if (item.isShow) {
      const children = item.children ? item.children : [];
      if (item.type === 'button') {
        result.push(item);
      } else {
        let menu = {
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
          children: createMenu(
            children.filter((child) => {
              return child.type !== 'button';
            })
          ),
        };
        if (item.redirect) {
          menu.name = item.redirect;
        }
        result.push(menu);
      }
    }
  });

  return result;
};

export default createMenu;
