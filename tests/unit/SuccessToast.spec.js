import { mount } from "@vue/test-utils";
import successToast from "@/components/toasts/successToast.vue";

describe("testes componente toast", () => {
  it('teste renderização posição', () => {
    const wrapper = mount(successToast);

    wrapper.find('div');

    expect(wrapper.html()).toContain();
  })
})