/**
 * 获取列表数据
 * @param requestFunc 获取数据的接口函数
 * @param searchData  搜索条件
 */
import { ref, watch } from 'vue';
export default function useGetList(requestFunc, searchData) {
  const loading = ref(false);
  const current = ref(0);
  const pageSize = ref(20);
  const total = ref(0);
  const valueList = ref([]);

  // 分页数据变化之后重新获取
  const tableChange = (value) => {
    current.value = value.current;
    pageSize.value = value.pageSize;
    total.value = value.total;
    getListValueFunc();
  };

  // 搜索条件变化
  watch(searchData, () => {
    getListValueFunc();
  });

  // 获取数据操作
  const getListValueFunc = async () => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    console.log('搜索条件', searchData);
    try {
      let res = await requestFunc({
        current,
        pageSize,
        ...searchData,
      });
      if (res) {
        valueList.value = res.list;
        total.value = res.total;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    valueList,
    loading,
    pageSize,
    current,
    total,
    getListValueFunc,
    tableChange,
  };
}
