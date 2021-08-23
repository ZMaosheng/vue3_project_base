import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode, ref } from 'vue';
export default function useTableActions() {
  // 显示确认删除弹窗
  const showDeleteConfirm = (requestFunc) => {
    Modal.confirm({
      title: '确定要删除吗？删除后不可恢复！',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteConfirm(requestFunc);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 点击确定，执行删除操作
  const loading = ref(false);
  const deleteConfirm = async (requestFunc) => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    try {
      let res = await requestFunc();
      if (res.data) {
        message.success('删除成功').then(() => {});
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  return {
    showDeleteConfirm,
  };
}
