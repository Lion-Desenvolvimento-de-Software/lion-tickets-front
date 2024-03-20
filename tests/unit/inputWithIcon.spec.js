import { mount } from '@vue/test-utils'
const Component = require('@/components/inputs/inputWithIcon.vue')

test('sets value', async () => {
  const wrapper = mount(Component);
  const input = wrapper.find('input');

  await input.setValue('teste@teste.com');
  
  expect(input.element.value).toBe('teste@teste.com')
})
