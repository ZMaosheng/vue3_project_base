/*
 * @Author: maosheng
 * @Date: 2021-06-21 10:28:26
 * @LastEditTime: 2021-06-21 10:28:27
 * @LastEditors: maosheng
 * @Description:
 */
// 根据角色，提取出所有的路由
const getAuthorRoutes = (roles, routes) => {
  if (roles && roles.length) {
    const result = [];
    routes.forEach((routerItem) => {
      const hasRoles = roles.some((rolesItem) => {
        return routerItem.meta.roles.includes(rolesItem);
      });
      if (hasRoles) {
        if (routerItem.children && routerItem.children.length) {
          routerItem.children = getAuthorRoutes(roles, routerItem.children);
        }
        result.push(routerItem);
      }
    });
    return result;
  } else {
    return [];
  }
};

// 权限配置时，树节点组件，根据已选中的节点key列表，取出对应的权限路由
const getCheckedValue = (list, keyList) => {
  let result = [];
  list.map((item) => {
    if (item.children && item.children.length) {
      // 有子节点的情况下，判断子节点是否有选中的节点
      let children = getCheckedValue(item.children, keyList);
      if (children && children.length) {
        item.children = children;
        result.push(item);
      }
    } else {
      // 没有子节点，直接判断父节点是否是选中状态
      if (keyList.includes(item.key)) {
        result.push(item);
      }
    }
  });
  return result;
};

const hasRoles = (myRoles, needRoles) => {
  return myRoles.some((myRolesItem) => {
    return needRoles.includes(myRolesItem);
  });
};

export { getAuthorRoutes, getCheckedValue, hasRoles };
