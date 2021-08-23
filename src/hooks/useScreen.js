import { onMounted, ref } from 'vue';
export default function useScreen() {
  const screenWidth = ref(null);
  const screenHeight = ref(null);

  onMounted(() => {
    screenWidth.value = document.body.clientWidth;
    screenHeight.value = document.body.clientHeight;
    window.onresize = () => {
      screenWidth.value = document.body.clientWidth;
      screenHeight.value = document.body.clientHeight;
    };
  });

  return {
    screenWidth,
    screenHeight,
  };
}
