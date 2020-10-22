
import { ref,  defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return () => (
      <div>
        {count.value}
      </div>
    );
  }
});
