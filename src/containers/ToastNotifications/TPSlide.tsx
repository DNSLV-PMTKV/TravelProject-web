import { Slide, SlideProps } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const TPSlide = (props: SlideProps): JSX.Element => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setOpen(false);
        }, 5000);
    });
    return (
        <Slide {...props} in={open} direction='left' unmountOnExit timeout={500}>
            {props.children}
        </Slide>
    );
};

export default TPSlide;
