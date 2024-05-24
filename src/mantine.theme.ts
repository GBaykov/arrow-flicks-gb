import {
    Button,
    Pagination,
    VariantColorsResolver,
    createTheme,
    darken,
    defaultVariantColorsResolver,
    lighten,
    parseThemeColor,
    rem,
    rgba,
    virtualColor,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
        color: input.color || input.theme.primaryColor,
        theme: input.theme,
    });

    // Override some properties for variant
    if (parsedColor.isThemeColor && parsedColor.color === 'purple' && input.variant === 'filled') {
        return {
            ...defaultResolvedColors,
            color: 'var(--mantine-color-white)',
            hoverColor: 'var(--mantine-color-white)',
            hover: 'var(--mantine-color-purple-4)',
            active: 'var(--mantine-color-purple-6)',
            border: 'none',
            focus: 'var(--mantine-color-purple-6)',
            background: 'var(--mantine-color-purple-5)',
        };
    }

    //

    // Completely override variant
    // if (input.variant === 'light') {
    //     return {
    //         background: rgba(parsedColor.value, 0.1),
    //         hover: rgba(parsedColor.value, 0.15),
    //         border: `${rem(1)} solid ${parsedColor.value}`,
    //         color: darken(parsedColor.value, 0.1),
    //     };
    // }
    if (input.variant === 'filled') {
        return {
            background: 'var(--mantine-color-purple-5)',
            color: 'var(--mantine-color-white)',
            hoverColor: 'var(--mantine-color-white)',
            hover: 'var(--mantine-color-purple-4)',
            active: 'var(--mantine-color-purple-6)',
            border: 'none',
            focus: 'var(--mantine-color-purple-6)',
        };
    }

    // if (input.variant === 'transparent') {
    //     return {
    //         background: 'transparent',
    //         backgroundColor: 'transparent',
    //         color: 'var(--mantine-color-purple-5)',
    //         hoverColor: 'var(--mantine-color-white)',
    //         hover: 'var(--mantine-color-purple-4)',
    //         active: 'var(--mantine-color-purple-6)',
    //         border: 'none',
    //     };
    // }

    // Add new variants support

    return defaultResolvedColors;
};

export const AppMantineTheme = createTheme({
    primaryColor: 'purple',
    primaryShade: 5,
    variantColorResolver,
    colors: {
        primary: virtualColor({
            name: 'primary',
            dark: 'purple',
            light: 'purple',
        }),
        purple: [
            '#F5EDFF',
            '#F2ECFA',
            '#E5D5FA',
            '#D1B4F8',
            '#BD93F7',
            '#9854F6',
            '#541F9D',
            '#4D1B95',
            '#591FAA',
            '#4D1896',
        ],
        gray: [
            '#FFFFFF',
            '#F5F5F6',
            '#EAEBED',
            '#D5D6DC',
            '#C9CAD3',
            '#ACADB9',
            '#7B7C88',
            '#60606D',
            '#505363',
            '#232134',
        ],
        yellow: [
            '#fff9e1',
            '#fff0cd',
            '#fde09d',
            '#fccf67',
            '#fbc13b',
            '#FAB005',
            '#fab30e',
            '#df9d00',
            '#c78b00',
            '#ac7700',
        ],
    },
    fontFamily: 'Inter, sans-serif',
    fontSizes: {
        xs: rem(10),
        sm: rem(12),
        md: rem(14),
        lg: rem(16),
        xl: rem(20),
        xxl: rem(24),
    },
    lineHeights: {
        xs: '1',
        sm: '1.25',
        md: '1.4',
        lg: '1.43',
        xl: '1.6',
    },

    headings: {
        // properties for all headings
        fontWeight: '400',
        fontFamily: 'Inter',
        // properties for individual headings, all of them are optional
        sizes: {
            h1: { fontWeight: '700', fontSize: rem(32), lineHeight: '1.4' },
            h2: { fontWeight: '600', fontSize: rem(24), lineHeight: '1.4' },
            h3: { fontWeight: '600', fontSize: rem(20), lineHeight: '1.4' },
            h4: { fontWeight: '700', fontSize: rem(20), lineHeight: '1' },
            h5: { fontWeight: '700', fontSize: rem(16), lineHeight: '1.4' },
            h6: { fontWeight: '400', fontSize: rem(16), lineHeight: '1.4' },
        },
    },
    radius: { xs: rem(6), sm: rem(8), md: rem(10), lg: rem(12) },
    defaultRadius: 'sm',
    spacing: { xs: rem(8), sm: rem(12), md: rem(16), lg: rem(18), xl: rem(24) },
    cursorType: 'pointer',
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    focusRing: 'never',
    components: {
        Button: Button.extend({
            // classNames: {
            //     root: 'pagination-root-class',
            //     control: 'pagination-control-class',
            //     dots: '.mantine-Pagination-dots',
            // },
            styles: {
                root: {
                    // backgroundColor: 'var(--mantine-color-purple-5)',
                    // hover: {
                    //     backgroundColor: 'var(--mantine-color-purple-4)',
                    // },
                    // active: {
                    //     backgroundColor: 'var(--mantine-color-purple-6)',
                    // },
                },
                loader: {},
                inner: {},
                section: {},
                label: {},
            },
        }),
    },
});
