import { NavLink, NavLinkProps } from '@mantine/core';
import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import navlink_classes from '@/styles/Navlink.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';

type StyledLinkProps = React.PropsWithChildren<NavLinkProps & Pick<LinkProps, 'href'>>;

 const StyledLink: FC<StyledLinkProps> = ({ ...props }) => {
    const currentRoute = useSelectedLayoutSegment();

    const isActive = currentRoute === props.href.toString().slice(1);
    return (
        <NavLink
            {...props}
            component={Link}
            classNames={{
                root: navlink_classes.root,
                label: navlink_classes.label,
            }}
            className={` ${isActive && navlink_classes.active}`}
            fz={'lg'}
            //  label={props.children}
        >
            {props.children}
        </NavLink>
    );
};
export default StyledLink