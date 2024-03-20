import { mount } from "@vue/test-utils";
import layoutLoginAndSignin from '@/components/layoutLoginAndSignin.vue';

describe('Testest do componente de layoutLoginAndSignin', () => {
  it('Tester icon render', () => {
    const wrapper = mount(layoutLoginAndSignin);

    expect(wrapper.html()).toContain("Redefinir")

  })
})