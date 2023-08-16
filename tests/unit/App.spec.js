import { mount } from '@vue/test-utils';
import fetchMock from 'jest-fetch-mock';
import App from '@/js/App';
import { clickOutside } from 'click-outside-vue3';
import data from '../../src/js/data/data.json';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(data));

const directives = {
    clickOutside: {
        ...clickOutside,
        mounted() {
            // shushing the console
        }
    }
};

describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App, {
            data() {
                return {
                    items: data.media
                };
            },
            global: {
                directives
            }
        });
    });

    it('renders the component', async () => {
        await wrapper.vm.$nextTick();
        expect(wrapper.exists()).toBe(true);
    });

    it('renders 30 items with "media-item" test id', async () => {
        await wrapper.vm.$nextTick();
        const testItems = wrapper.findAll('[data-testid="media-item"]');
        expect(testItems.length).toBe(30);
    });

    it('displays 15 items after clicking "Books" radio button', async () => {
        await wrapper.vm.$nextTick();

        const filtersComponent = wrapper.findComponent({ name: 'Filters' });
        const bookRadio = filtersComponent.find('[data-testid="book-radio"]');
        await bookRadio.trigger('click');

        await wrapper.vm.$nextTick();

        const mediaItems = wrapper.findAll('[data-testid="media-item"]');
        expect(mediaItems.length).toBe(15);
    });

    it('displays 0 items and a "no results" message after clicking "Books" radio button and then selecting year 1963', async () => {
        await wrapper.vm.$nextTick();

        const filtersComponent = wrapper.findComponent({ name: 'Filters' });
        const bookRadio = filtersComponent.find('[data-testid="book-radio"]');
        await bookRadio.trigger('click');

        await wrapper.vm.$nextTick();

        const yearsDropdown = filtersComponent.find('[data-testid="Years-button"]');
        await yearsDropdown.trigger('click');

        await wrapper.vm.$nextTick();

        const sixtyThreeCheck = filtersComponent.find('[data-testid="1963-checkbox"]');
        await sixtyThreeCheck.trigger('click');

        await wrapper.vm.$nextTick();

        const mediaItems = wrapper.findAll('[data-testid="media-item"]');
        expect(mediaItems.length).toBe(0);

        const noResultsMessage = wrapper.find('[data-testid="no-results-message"]');
        expect(noResultsMessage.exists()).toBe(true);
    });
});
