import { mount } from "@vue/test-utils";
import spinner from '@/components/spinner.vue';

describe("testes loadings", () => {
  it("Spinner center", () => {
    const wrapper = mount(spinner, {
      props: {
        isLoading: true
      }
    });

    expect(wrapper.html()).toContain('Loading...');
  });
});