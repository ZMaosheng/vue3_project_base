/**
 * 获取当前路由所分配的按钮
 */
import { useRoute } from 'vue-router';
export default function useRoleButtons() {
  const route = useRoute();

  // 路由下所有权限按钮
  const buttons = route.meta.buttons;

  console.log(route.meta);

  // 是否具有某按钮的权限
  const haveButton = (path) => {
    return buttons.find((item) => {
      return item.path === path;
    });
  };
  return {
    buttons,
    haveButton,
  };
}
