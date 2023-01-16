import { it, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Btn from './Btn.vue'

/**
 * @vitest-environment jsdom
 */

describe('Btn component', () => {
  describe('default slot', () => {
    it('should display nothing', () => {
      const wrapper = mount(Btn)
      expect(wrapper.text()).toBe('')
    })

    it('should display text', () => {
      const wrapper = mount(Btn, { slots: { default: 'testing' } })
      expect(wrapper.text()).toBe('testing')
    })
  })

  describe(':to property', () => {
    it('should display a link', () => {
      const wrapper = mount(Btn, {
        global: {
          stubs: {
            RouterLink: {
              template: '<a :href="$attrs.to"><slot /></a>',
            },
          },
        },
        attrs: { to: '/testing' },
        slots: { default: 'testing' },
      })
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('/testing')
    })
  })

  describe(':size property', () => {
    it('should display a medium button by default', () => {
      const wrapper = mount(Btn)
      expect(wrapper.find('.text-md').exists()).toBe(true)
    })

    it('should display a small button', () => {
      const wrapper = mount(Btn, { attrs: { size: 'sm' } })
      expect(wrapper.find('.text-sm').exists()).toBe(true)
    })

    it('should display a medium button', () => {
      const wrapper = mount(Btn, { attrs: { size: 'md' } })
      expect(wrapper.find('.text-md').exists()).toBe(true)
    })

    it('should display a large button', () => {
      const wrapper = mount(Btn, { attrs: { size: 'lg' } })
      expect(wrapper.find('.text-lg').exists()).toBe(true)
    })

    // TODO: test invalid
  })

  describe(':variant property', () => {
    it('should display a secondary button by default', () => {
      const wrapper = mount(Btn)
      expect(wrapper.find('[class*="bg-secondary"]').exists()).toBe(true)
    })

    it('should display a primary button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'primary' } })
      expect(wrapper.find('[class*="bg-primary"]').exists()).toBe(true)
    })

    it('should display a secondary button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'secondary' } })
      expect(wrapper.find('[class*="bg-secondary"]').exists()).toBe(true)
    })

    it('should display a danger button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'danger' } })
      expect(wrapper.find('[class*="bg-danger"]').exists()).toBe(true)
    })

    it('should display a warning button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'warning' } })
      expect(wrapper.find('[class*="bg-warning"]').exists()).toBe(true)
    })

    it('should display a success button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'success' } })
      expect(wrapper.find('[class*="bg-success"]').exists()).toBe(true)
    })

    it('should display a info button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'info' } })
      expect(wrapper.find('[class*="bg-info"]').exists()).toBe(true)
    })

    // TODO: test invalid
  })

  describe(':outline property', () => {
    it('should not display an outline by default', () => {
      const wrapper = mount(Btn)
      expect(wrapper.find('[class*="border-secondary"]').exists()).toBe(false)
    })

    it('should display a primary outline button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'primary' } })
      expect(wrapper.find('[class*="bg-primary"]').exists()).toBe(true)
    })

    it('should display a secondary outline button', () => {
      const wrapper = mount(Btn, {
        attrs: { variant: 'secondary', outline: true },
      })
      expect(wrapper.find('[class*="bg-secondary"]').exists()).toBe(true)
    })

    it('should display a danger outline button', () => {
      const wrapper = mount(Btn, {
        attrs: { variant: 'danger', outline: true },
      })
      expect(wrapper.find('[class*="bg-danger"]').exists()).toBe(true)
    })

    it('should display a warning outline button', () => {
      const wrapper = mount(Btn, {
        attrs: { variant: 'warning', outline: true },
      })
      expect(wrapper.find('[class*="bg-warning"]').exists()).toBe(true)
    })

    it('should display a success outline button', () => {
      const wrapper = mount(Btn, {
        attrs: { variant: 'success', outline: true },
      })
      expect(wrapper.find('[class*="bg-success"]').exists()).toBe(true)
    })

    it('should display a info outline button', () => {
      const wrapper = mount(Btn, { attrs: { variant: 'info', outline: true } })
      expect(wrapper.find('[class*="bg-info"]').exists()).toBe(true)
    })
  })

  describe(':disabled property', () => {
    it('should not display a disabled button by default', () => {
      const wrapper = mount(Btn)
      expect(wrapper.find(':disabled').exists()).toBe(false)
    })

    it('should display a disabled button', () => {
      const wrapper = mount(Btn, { attrs: { disabled: true } })
      expect(wrapper.find(':disabled').exists()).toBe(true)
    })
  })

  // TODO: event tests, including diabled not allowing click
})
