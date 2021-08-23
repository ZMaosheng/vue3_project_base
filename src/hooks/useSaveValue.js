import { ref } from 'vue';
import { message } from 'ant-design-vue';
export default function useSaveValue({
  request,
  params,
  isEdit,
  success,
  fail,
}) {
  const loading = ref(false);
  const isSuccess = ref(true);
  const saveValueFetch = async () => {
    try {
      if (loading.value) {
        return;
      }
      loading.value = true;
      let res = await request(params);
      if (res) {
        // 保存成功，或者编辑成功
        isSuccess.value = true;
        message.success(isEdit ? '编辑成功' : '保存成功');
        success && success();
      } else {
        // 失败
        isSuccess.value = false;
        message.error(isEdit ? '编辑失败' : '保存失败');
        fail && fail();
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    isSuccess,
    saveValueFetch,
  };
}
